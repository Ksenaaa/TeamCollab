'use server'

import { Prisma, Project } from '@/generated/prisma';
import { errorHandler } from '@/lib/errorHandlers';
import prisma from '@/lib/prisma'
import { ActionResult } from '@/models/actionResponse';
import { RouterPath } from '@/utils/constants/routerPath';
import { revalidatePath } from 'next/cache';

export async function createProjectAction(data: Prisma.ProjectCreateInput): Promise<ActionResult<Project>> {
    try {
        const project = await prisma.project.create({ data });
        revalidatePath(RouterPath.PROJECTS);

        return { success: true, data: project, message: 'Project created successfully', status: 201 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function updateProjectAction(id: string, data: Prisma.ProjectUpdateInput): Promise<ActionResult<null>> {
    try {
        await prisma.project.update({
            where: { id },
            data,
        });
        revalidatePath(`/${id}/boards`);

        return { success: true, data: null, message: 'Project updated successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}

export async function deleteProjectAction(id: string): Promise<ActionResult<null>> {
    try {
        await prisma.project.delete({
            where: { id },
        });

        return { success: true, data: null, message: 'Project deleted successfully', status: 204 };
    } catch (error) {
        return errorHandler(error);
    }
}
