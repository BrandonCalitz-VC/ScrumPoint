import bcrypt from "bcrypt"
import NextAuth, {AuthOptions, NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"

import prisma from "@/app/lib/prismadb"
import { Users } from "@prisma/client"

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers:[
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email : {label: 'email', type: 'text'},
				password: {label : 'password', type:'password'},
			},
			async authorize(credentials,req){
				if(!credentials?.email ||!credentials?.password){
					throw new Error('Invalid Credentials')
				}
				const user : Users | null = await prisma.users.findFirst({
					where:{
						Email: credentials?.email
					}
				})
				if (user === null)  throw new Error('Invalid Credentials');

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.Password
				)
				if(!isCorrectPassword) throw new Error('Invalid Credentials')
				return {id: user.UserID};
			},
		type:"credentials",
		id: "credentials",
		}),
		
	],
	debug: process.env.NODE_ENV === 'development',
	session:{
		strategy: "jwt",
	},
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks:{
		jwt({ token, account, user }) {
			if (account) {
			  token.accessToken = account.access_token
			  token.id = user?.id
			}
			return token
		  },
		session({ session, token }) {
			// I skipped the line below coz it gave me a TypeError
			// session.accessToken = token.accessToken;
			session.user.id = token.id;
	  
			return session;
		  },
	},
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}