import withAuth from "next-auth/middleware";
import { NextResponse } from 'next/server'

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const isTokenExpired = token && token.exp * 1000 < Date.now();
        const isAuthorized = !!token && !isTokenExpired;

        if (!isAuthorized) {
            const signInUrl = new URL('/auth/signin', req.url);
            signInUrl.searchParams.set('callbackUrl', '/');

            return NextResponse.redirect(signInUrl);
        }

        return NextResponse.next();
    },
    {
        pages: {
            signIn: '/auth/signin',
            error: '/auth/error',
        },
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth/|$).*)'],
};
