import connectDB from "./Config/Database.js";
import bcrypt from "bcrypt";
import User from "./Model/AdminModel.js";

const register = async () => {
    try {
        connectDB();
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            username: "admin",
            email: "admin@gmail.com",
            password: hashPassword,
            address: "admin address"
        })
        await newUser.save();
        console.log("Admin User created Successfullly");
    }
    catch (error) {
        console.error(error);
    }
}

register();