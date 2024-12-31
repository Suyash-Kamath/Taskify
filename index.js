import express from "express";
import dotenv from "dotenv";
import todoRouters from "./routers/todoRouters.js"
import userRouters from "./routers/userRouters.js"

const app = express();
dotenv.config();

app.use(express.json());

app.use("/todo",todoRouters);
app.use("/user",userRouters);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`);
})
