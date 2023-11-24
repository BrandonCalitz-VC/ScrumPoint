// auth.ts
import NextAuth from 'next-auth';
import AuthOptions from '@/app/lib/auth.config';

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };