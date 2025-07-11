import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "@/lib/errorHandlers";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/models/actionResponse";
import { UsersShort } from "@/models/userShort";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ActionResult<UsersShort>>) {
    try {
        if (req.method !== "POST") return res.status(405).json({ success: false, error: 'Method not allowed', status: 405 });

        const { email, password, name } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing) return res.status(400).json({ success: false, error: "Email already used", status: 400 });

        const hashed = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashed,
            },
        });

        return res.status(201).json({ success: true, data: { id: user.id, email: user.email, name: user.name, role: user.role }, message: 'User created successfully', status: 201 });
    } catch (error) {
        const result = errorHandler(error);

        return res.status(result.status).json({ success: result.success, error: result.error, status: result.status });
    }
}
