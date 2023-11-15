import prisma from "@/app/lib/prismadb";
import { Teams } from "@prisma/client";
import { NextResponse } from "next/server";

export type MatchListResult = { 
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
  
  let data=  await prisma.matches.findMany({  

    select:{
      AwayScore: true,
      HomeScore:true,
      HomeTeam: true,
      AwayTeam: true,
      MatchDate: true,
    },
    where:{
      MatchDate: {
        lte: date,
      }
    },
    
    orderBy:{
      MatchDate:"desc"
    },
    
    
  })
  data = data.map(match => ({
    ...match,
    MatchDate: new Date(match.MatchDate).toDateString(),
  }));
  
  return NextResponse.json(data);
  
}catch(err){
 console.log("[POOL.GETMATCHES]", err);
 return new NextResponse("Internal Error", {status: 500})
}
}