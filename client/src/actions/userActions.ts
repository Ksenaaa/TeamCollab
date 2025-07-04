'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const userActions = {
    create: async (data: Prisma.UserCreateInput) => {
        try {
            // e.g., data.password = await bcrypt.hash(data.password, 10)
            const user = await prisma.user.create({ data });
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    },
    update: async (id: string, data: Prisma.UserUpdateInput) => {
        try {
            const user = await prisma.user.update({
                where: { id },
                data,
            });
            return user;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.user.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, error: "Failed to delete user" };
        }
    }
}
