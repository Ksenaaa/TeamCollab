import { ActionResult } from '@/models/actionResponse';
import { NextRequest } from 'next/server';

export function buildResponse<T>(req: NextRequest, result: ActionResult<T>): Response {
    if (result.success) {
        let status = result?.status;
        if (!status) {
            switch (req.method) {
                case 'POST': status = 201; break;
                case 'PUT': status = 204; break;
                case 'PATCH': status = 204; break;
                case 'DELETE': status = 204; break;
                default: status = 200;
            }
        }

        if (status === 204) {
            return new Response(null);
        }

        return Response.json({ success: true, data: result.data });
    }

    // Error
    return Response.json({ success: false, error: result.error }, {
        status: result.status ?? 500
    });
}
