import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map();

export function rateMiddleware(request: NextRequest) {
    const ip = request.ip;
    const currentTime = Date.now();

    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, startTime: currentTime });
    } else {
        const userData = rateLimit.get(ip);
        userData.count += 1;

        // Allow only 100 requests per minute
        if (userData.count > 100 && currentTime - userData.startTime < 60000) {
            return new Response('Too many requests', { status: 429 });
        }

        // Reset count after one minute
        if (currentTime - userData.startTime > 60000) {
            rateLimit.set(ip, { count: 1, startTime: currentTime });
        }
    }

    return NextResponse.next();
}
