import { getServerSession } from "next-auth";
import { Role } from "@/generated/prisma";
import { authConfig } from "@/lib/auth.config";
import { errorWithDetails } from "@/utils/helpers/errorWithDetails";

export async function authenticateUser() {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
        throw errorWithDetails({ message: "Authentication required", status: 401 });
    }
    return session;
}

export async function authorizeUser(requiredRoles: Role[] = []) {
    const session = await authenticateUser();

    if (requiredRoles.length > 0 && (!session.user.role || !requiredRoles.includes(session.user.role))) {
        throw errorWithDetails({ message: "Forbidden: Insufficient permissions", status: 403 });
    }
    return session;
}
