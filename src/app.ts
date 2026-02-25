import express from "express";
import productRoutes from "./api/v1/routes/productRoutes";
import { HTTP_STATUS } from "./constants/httpConstants";

const app = express();

app.use(express.json());

app.use("/api/v1", productRoutes);


app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});



export default app;