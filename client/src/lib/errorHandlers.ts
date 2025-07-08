import { Prisma } from "@/generated/prisma";
import { ActionError } from "@/models/actionResponse";

export function errorHandler(error: unknown): ActionError {
    let message = 'Unknown server error';
    let status = 500;
    let details: Record<string, string[]> | undefined;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                const fields = (error.meta?.target as string[] | undefined)?.join(', ') ?? 'field';
                message = `A record with that ${fields} already exists`;
                status = 409;
                details = { [fields]: [message] };
                break;
            case 'P2025':
                message = 'Record not found';
                status = 404;
                break;
            case 'P2000':
                message = 'A field value is too long';
                status = 400;
                break;
            default:
                message = `Database error: ${error.message}`;
        }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
        message = 'Invalid input data';
        status = 400;
    } else if (error instanceof Error) {
        message = `Error: ${error.message}`;
        status = error.status ?? status;
        details = error.details;
    }

    return { success: false, error: message, status, details };
}
