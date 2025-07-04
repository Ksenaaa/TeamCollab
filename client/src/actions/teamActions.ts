'use server'
import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'

export const teamActions = {
    create: async (data: Prisma.TeamCreateInput) => {
        try {
            const team = await prisma.team.create({ data });
            return team;
        } catch (error) {
            console.error("Error creating team:", error);
            throw new Error("Failed to create team");
        }
    },
    update: async (id: string, data: Prisma.TeamUpdateInput) => {
        try {
            const team = await prisma.team.update({
                where: { id },
                data,
            });
            return team;
        } catch (error) {
            console.error("Error updating team:", error);
            throw new Error("Failed to update team");
        }
    },
    delete: async (id: string) => {
        try {
            await prisma.team.delete({
                where: { id },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting team:", error);
            return { success: false, error: "Failed to delete team" };
        }
    }
}
