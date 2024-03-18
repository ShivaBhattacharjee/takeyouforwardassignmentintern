import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { HTTP_STATUS } from "./src/enums/enums.js";
import submittedCodeRouter from "./src/router/submittedCode.router.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE, PATCH",
    })
);
// logs middleware
app.use(morgan("tiny"));

app.disable("x-powered-by");

// test route

app.get("/", (_, res) => {
    res.json({
        message: "Api is working fine",
        status : HTTP_STATUS.OK
    }).status(HTTP_STATUS.OK);
});

app.use("/api/v1", submittedCodeRouter)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
})

