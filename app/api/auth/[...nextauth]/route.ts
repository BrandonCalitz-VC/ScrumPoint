import bcrypt from "bcrypt"
import NextAuth, {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"

import prisma from "@/app/lib/prismadb"
import { Users } from "@prisma/client"

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers:[
		CredentialsProvider({
			name: 'credlogin',
			credentials: {
				email : {label: 'email', type: 'text'},
				password: {label : 'password', type:'password'}
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

				return user;
			}
		}),
		
	],
	debug: process.env.NODE_ENV === 'development',
	session:{
		strategy: "jwt",
	},
	secret: process.env.NEXT_AUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}