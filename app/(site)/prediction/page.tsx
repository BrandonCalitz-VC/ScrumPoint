"use client"

import { NextMatchModel } from "@/app/api/matches/getnextmatch/route"
import { Matches, Predictions } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"


export default function Prediction() {
    const session = useSession();
    const [match, setMatch] = useState<NextMatchModel>();
    const date :Date = new Date("2023-09-20")
    useEffect(()=>{
      (async () => {
        try {
          
          const {data}:{data:NextMatchModel} = await axios.post('/api/matches/getnextmatch',{date: date})
          setMatch(data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    },[])
    const {
        register, 
        handleSubmit,
        reset,
        formState:{
          errors
        }
      } = useForm<FieldValues>({
        defaultValues:{
          winner: '',
          homescore: 0,
          awayscore: 0,
        }
      })

      const onSubmit:SubmitHandler<FieldValues> = (data) =>{
          const winningteam = data.winner == 'HOME'? match?.HomeTeam.TeamID: match?.AwayTeam.TeamID
      
          const prediction: Predictions = {
          UserID: session.data?.user.id,
          MatchID: match.MatchID,
          PredictedWinningTeamID: winningteam,
          HomeTeamScorePrediction: Number.parseInt(data.homescore),
          AwayTeamScorePrediction: Number.parseInt(data.awayscore),
          }
          debugger
          axios.post('/api/prediction/makeprediction',{prediction})
      }


  return (
    <main className="h-full w-full py-10">
        <div className=" h-full w-full rounded-3xl border-4 flex bg-black bg-opacity-70 justify-center items-center">
            <div className="bg-white w-96  h-fit  rounded-lg flex flex-col justify-center">
                <div className="bg-blue-800 w-full h-20 mt-5 flex justify-between text-white">
                  <div className="flex justify-center items-center h-full p-5  gap-4">
                    <img
                        src={match?.HomeTeam.Flag}
                        alt="Team 1 Flag"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                      {match?.HomeTeam.CountryCode}
                  </div>
                  <div className="w-16 text-center">
                    {match?.MatchDate}
                  </div>
                  <div className="flex justify-center items-center h-full p-5 gap-4">
                    {match?.AwayTeam.CountryCode}
                    <img
                        src={match?.AwayTeam.Flag}
                        alt="Team 1 Flag"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                  </div>
                </div>
                <form  onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col  items-center px-5 p-3"
                >
                    <div className="flex justify-between px-5 mb-3 w-full">
                        <input 
                        id="winner"
                        type="radio"
                        value='HOME'
                        {...register("winner")}
                        className=" border-blue-700 w-5 "
                        />
                        <label className="text-lg font-bold">Predict Winner</label>
                        <input 
                        id="winner"
                        type="radio"
                        value='AWAY'
                        {...register("winner")}
                        className=" border-blue-700 w-5 "
                        />
                    </div>
                    <div className="flex justify-between w-full">
                        <input 
                        id="homescore"
                        type="text"
                        {...register("homescore")}
                        className="w-16 bg-blue-500 rounded-lg text-center text-white font-bold"
                        />
                        <label className="text-lg font-bold">Predict Score</label>
                        <input 
                        id="awayscore"
                        type="text"
                        {...register("awayscore")}
                        className="w-16 bg-blue-500 rounded-lg text-center text-white font-bold"
                        />
                    </div>
                    <button type="submit"
                    className="bg-blue-700 rounded-full w-40 text-white font-bold text-lg mt-5"
                    >Submit</button>
                </form>
            </div>
        </div>
    </main>
  )
}