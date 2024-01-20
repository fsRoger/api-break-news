import dotenv from "dotenv";
import userService from "../service/user.service.js"
import jwt from "jsonwebtoken";

dotenv.config();


export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.send(401);
        }
        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return (401);
        }

        const [Schema, token] = parts

        if (Schema !== "Bearer") {
            return res.send(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "token invalid" });
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "invalid token" })
            }

            req.userId = user.id;

            return next();

        });

        
    } catch (err) {
        res.status(500).send(err.message);
    }

};