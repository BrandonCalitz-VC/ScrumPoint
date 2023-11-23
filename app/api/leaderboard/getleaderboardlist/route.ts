import prisma from "@/app/lib/prismadb";
import { Teams } from "@prisma/client";
import { NextResponse } from "next/server";

export type LeaderboardListResult = { 
  pos: string;
  username: string;
  guesed: number;
  points: number;
 }

export async function POST(
 req: Request
){
 try{
  let data =  await prisma.users.findMany({  

    select:{
      Username :true,
      Predictions: true,
      Score : true,
    },
    orderBy:{
      Score: "desc"
    },
  })

    let formatdata : LeaderboardListResult[]= data.map(x=>{
        return {pos:"", guesed: x.Predictions.length,points:x.Score,username:x.Username} as LeaderboardListResult;
    })

    formatdata[0].pos = "1ST"
    formatdata[1].pos = "2ND"
    formatdata[2].pos = "3RD"
    for (let i = 3; i < formatdata.length; i++) {
        formatdata[i].pos = i+1 + "TH"
    }
  
  return NextResponse.json(formatdata);
  
}catch(err){
 console.log("[POOL.GETMATCHES]", err);
 return new NextResponse("Internal Error", {status: 500})
}
}

