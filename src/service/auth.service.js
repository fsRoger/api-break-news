import jwt from "jsonwebtoken";
import User from "../models/User.js";

const { JsonWebTokenError } = jwt;

const loginService = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expireIn: 86400 });

export { loginService, generateToken };