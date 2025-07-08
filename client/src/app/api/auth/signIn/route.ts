import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { errorHandler } from "@/lib/errorHandlers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { RouterPath } from "@/utils/constants/routerPath";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authConfig);

        if (!session || session.user.role !== 'admin') {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 403 });
        }
        console.log('3443')
        const { email, password, name, role } = await req.json();

        const hashed = await hash(password, 10);

        const user = await prisma.user.create({
            data: { email, name, role, password: hashed },
        });

        revalidatePath(RouterPath.USERS);

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.log('eerrr')

        const result = errorHandler(error);
        return NextResponse.json({ success: false, error: result.error }, { status: result.status });
    }
}
