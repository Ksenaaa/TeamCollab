import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "@/lib/errorHandlers";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/models/actionResponse";
import { UsersShort } from "@/models/userShort";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ActionResult<UsersShort>>) {
    try {
        console.log('register!!')
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

// import { NextRequest, NextResponse } from "next/server";
// import { hash } from "bcrypt";
// import { errorHandler } from "@/lib/errorHandlers";
// import prisma from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { RouterPath } from "@/utils/constants/routerPath";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth.config";

// export async function POST(req: NextRequest) {
//     try {
//         const session = await getServerSession(authConfig);

//         if (!session || session.user.role !== 'admin') {
//             return Response.json({ success: false, error: "Unauthorized" }, { status: 403 });
//         }
//         console.log('3443')
//         const { email, password, name, role } = await req.json();

//         const hashed = await hash(password, 10);

//         const user = await prisma.user.create({
//             data: { email, name, role, password: hashed },
//         });

//         revalidatePath(RouterPath.USERS);

//         return NextResponse.json(
//             {
//                 success: true,
//                 data: {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     role: user.role,
//                 },
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.log('eerrr')

//         const result = errorHandler(error);
//         return NextResponse.json({ success: false, error: result.error }, { status: result.status });
//     }
// }
