import mongoose from "mongoose"


const connectMongoDB=async()=>{

    try {

        await mongoose.connect(process.env.URI_MONGODB);
        console.log("conexion correcta");
        
    } catch (error) {
        console.log("Error en la conexion");
    }
}

export default connectMongoDB;