'use server'

import { Prisma } from '@/generated/prisma';
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function createProjectAction(data: Prisma.ProjectCreateInput) {
    try {
        const project = await prisma.project.create({ data });
        revalidatePath('/');
        return project;
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
    }
}

export async function updateProjectAction(id: string, data: Prisma.ProjectUpdateInput) {
    try {
        const project = await prisma.project.update({
            where: { id },
            data,
        });
        return project;
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project");
    }
}

export async function deleteProjectAction(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, error: "Failed to delete project" };
    }
}
