import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export type PoolCountries = { flag: string, country:string, played: number, w :number, l: number, points: number }

export async function POST(
 req: Request
){
 try{
  const body = await req.json();
  const {pool} = body;

  const data =  await prisma.standings.findMany({  
    where: {
      PoolID : pool
    },
    select:{
      Played: true,
      Wins: true,
      Losses: true,
      Points: true,
      PoolID: true,
      Teams :{
        select :{
          TeamName: true,
          Flag: true,
        }
      }
    },
    
  })
  
  
  if(data.length === 0) throw new Error("Invalid Pool")

  const formatedData =  data.map((team) => {
    const { Losses,Played, Points,Wins, Teams} = team
    const { Flag,TeamName } = Teams;
    
    return { flag: Flag, country: TeamName, played: Played, w: Wins, l: Losses, points: Points} as PoolCountries;
  });
  
  return NextResponse.json(formatedData);

}catch(err){
 console.log("[POOL.GETCOUNTRIES]", err);
 return new NextResponse("Internal Error", {status: 500})
}
}