interface ErrorWithDetailsProps {
    message: string;
    details?: Record<string, string[]>;
    status?: number;
}

export function errorWithDetails({ message, details, status }: ErrorWithDetailsProps) {
    const error = new Error(message);
    error.status = status;
    error.details = details;

    return error;
}
