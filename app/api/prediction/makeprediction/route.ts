import prisma from "@/app/lib/prismadb";
import { Predictions, Teams } from "@prisma/client";

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
  console.log('CREATING PREDICTION');
  
  const body = await req.json();
  const {prediction}: {prediction:Predictions} = body;
  if(await prisma.predictions.findFirst({
    where:{
      AND:[
        {UserID: prediction.UserID},
        {MatchID: prediction.MatchID}
      ]
    }
  })){return new NextResponse("Prediction Already Created", {status: 200})}

  prisma?.predictions.create({
    data: prediction
  }).catch((err)=> console.log(err))
  

  
  return  
  
}catch(err){
 console.log("[POOL.GETMATCHES]", err);
 return new NextResponse("Internal Error", {status: 500})
}
}