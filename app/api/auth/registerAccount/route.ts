import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { Users } from "@prisma/client";


export async function POST(
 req: Request
){
	console.log("REGISTER USER API");
 try{
			
		
    const body = await req.json();
    const {email, password, username} = body;

				if(!email ||!password){
					throw new Error('Invalid Credentials')
				}
				const users : Users[] = await prisma.users.findMany({
					where:{
						Email: email,
						Username : username
					}
				})

				if (users.length != 0)  throw new Error('Invalid Credentials');
				const hashedPassword = await bcrypt.hashSync(password, 14)
    console.log("CREATING USER");
    
				const user = await prisma.users.create({
					data:{
						Email: email,
						Password: hashedPassword,
						Username: username,
						Firstname: "",
						ContactNum: "",
						Country: "",
						Surname: "",
						Score: 0,
					}
				})
    console.log("SUCCESS");
    return NextResponse.json(user)
 }catch(err){
   console.log("[AUTH.REGISTER]", err);
   return new NextResponse("Internal Error", {status: 500})
 }
}