import mongoose from "mongoose"

const connectDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Already Databse Connected!!");
        return
    }

    try {
        await mongoose.connect(process.env.CONNECTION_STR)
        console.log("Database Conneted SuccessFully!!");

    } catch (error) {
        console.log("databse Connection Failed, :", error.message);

    }
}

export default connectDatabase