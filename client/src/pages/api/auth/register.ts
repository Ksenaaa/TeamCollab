import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, password, name } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already used" });

    const hashed = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashed,
        },
    });

    return res.status(201).json(user);
}
