import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth_subscription", "root", "root", {
    host: "localhost",
    dialect: "mysql"
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connected to db")
        await sequelize.sync({ alter: true })
    } catch (error) {
        console.error("Error connecting db")
    }
}

export { sequelize, connectDB }