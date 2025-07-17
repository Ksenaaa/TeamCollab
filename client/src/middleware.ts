import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import { RouterPath } from "./utils/constants/routerPath";
import { Role } from "./generated/prisma";

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith(`/${RouterPath.USERS}`)) {
            if (!token || token.role !== Role.ADMIN) {
                return NextResponse.redirect(new URL(RouterPath.PROJECTS, req.url));
            }
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                const isTokenExpired = token && token.exp * 1000 < Date.now();
                const isAuthorized = !!token && !isTokenExpired;

                if (!isAuthorized) {
                    return false;
                }

                return true;
            },
        },
        pages: {
            signIn: '/auth/signin',
            error: '/auth/error'
        },
    }
);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/|$).*)']
};
