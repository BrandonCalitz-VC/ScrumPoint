import prisma from "@/app/lib/prismadb";
import { Teams } from "@prisma/client";
import { NextResponse } from "next/server";

export type NextMatchModel = { 
    MatchID: number,
    MatchDate: string,
    HomeTeam: Teams
    HomeScore: number
    AwayScore:number
    AwayTeam:Teams
 }

export async function POST(
 req: Request
){
 try{
  const body = await req.json();
  const {date} = body;
  debugger;
  let data =  await prisma.matches.findFirst({  

    select:{
        MatchID:true,
        AwayScore: true,
        HomeScore:true,
        HomeTeam: true,
        AwayTeam: true,
        MatchDate: true,
    },
    where:{
      MatchDate: {
        gte: date,
      }
    },
    
    orderBy:{
      MatchDate:"asc"
    },
    
    
  })
  data.MatchDate = new Date(data.MatchDate).toDateString();
  
  return NextResponse.json(data);
  
}catch(err){
 console.log("[POOL.GETMATCHES]", err);
 return new NextResponse("Internal Error", {status: 500})
}
}