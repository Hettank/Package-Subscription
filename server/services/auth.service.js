import User from "../model/auth.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const authServices = {
    getUsers: async () => {
        try {
            const users = await User.findAll()
            return users
        } catch (error) {
            throw new Error("Error getting registered users");
        }
    },

    register: async (firstName, lastName, email, password) => {
        try {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                throw new Error("User already exists with this email");
            }

            const user = await User.create({ firstName, lastName, email, password });
            return user;
        } catch (error) {
            throw new Error("Registration Error");
        }
    },

    login: async (email, password) => {
        try {
            const userExist = await User.findOne({ where: { email } });

            if (!userExist) {
                throw new Error("User not found");
            }

            if (password !== userExist.password) {
                throw new Error("Invalid credentials");
            }

            const payload = {
                email: userExist.dataValues.email,
                id: userExist.dataValues.id,
                role: userExist.dataValues.role,
            }

            const token = jwt.sign(payload, 'thisismysecret', { expiresIn: '2d' })

            return {
                id: userExist.dataValues.id,
                email: userExist.email,
                token,
                role: userExist.dataValues.role
            };
        } catch (error) {
            throw new Error("Login Error");
        }
    },

    userByPackageId: async (packageId) => {
        try {
            const user = await User.findOne({ where: { PackageId: packageId } })
            return user
        } catch (error) {
            console.log(error)
        }
    }
};

export default authServices;