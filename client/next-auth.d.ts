import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { NextAuthRequest } from 'next-auth/lib';
import { NextRequest } from 'next/server';

// Extend the built-in NextRequest type
declare module 'next/server' {
    interface NextRequestAuth extends NextRequest {
        auth?: NextAuthRequest['auth'];
    }
}

// Extend the built-in NextAuth JWT type
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: string;
    }
}

// Extend the built-in NextAuth User type (for the `user` object in `jwt` callback)
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        role: string;
    }
}

