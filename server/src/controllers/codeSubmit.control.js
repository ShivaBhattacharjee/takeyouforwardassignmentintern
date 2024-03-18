import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS } from "../enums/enums.js";

// get all the code submitted
const prisma = new PrismaClient();

export const getALLSubmittedCode = async (_, res) => {
    try {
        const submittedCode = await prisma.user.findMany({
            include: {
                codes: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.status(HTTP_STATUS.OK).json({ data: submittedCode, message: "All submitted code fetched successfully", status: HTTP_STATUS.OK });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error " + JSON.stringify(error) });
    }
}



export const registerCode = async (req, res) => {
    try {
        const { username, language, stdin, sourceCode } = req.body;
        if (!username || !language || !stdin || !sourceCode) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "All fields are required" });
        }
        if (language !== "C_PLUS_PLUS" && language !== "JAVASCRIPT" && language !== "PYTHON") {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid language" });
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUser) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Username already exists, try another one" });
        }
        const createdUser = await prisma.user.create({
            data: {
                username,
            },
        });
        try {
            const submittedCode = await prisma.code.create({
                data: {
                    language: language,
                    stdin: stdin,
                    code: sourceCode,
                    userId: createdUser.id,
                },
            });
            return res.status(HTTP_STATUS.OK).json({
                data: submittedCode,
                message: "Code submitted successfully",
                status: HTTP_STATUS.OK
            });
        } catch (error) {
            console.error("Prisma error:", error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error " + JSON.stringify(error) });
        }

    } catch (error) {
        console.error("Error registering code:", error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}
