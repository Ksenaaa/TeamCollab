export type ActionSuccess<T> = {
    success: true;
    data: T;
    status: 200 | 201 | 204;
    message?: string;
}

export type ActionError = {
    success: false;
    error: string;
    status: number;
    details?: Record<string, string[]>;
}

export type ActionResult<T> = ActionSuccess<T> | ActionError;
