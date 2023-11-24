/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

import imgRugbyPlayer from "@/public/RugbyPlayer2.png";
import backgroundImage from "@/public/bg.png";
import HomeMatch from "@/app/components/HomeMatch";
import SAFlag from "@/public/SAFlag.png";
import EngFlag from "@/public/ENGFlag.png";
import { MatchListResult } from "@/app/api/matches/getmatches/route";
import axios from "axios";

const App = () => {
  const [matches, setMatches] = useState<MatchListResult[]>()
  const date :Date = new Date("2023-11-24")
  useEffect(()=>{
    (async () => {
      try {
        const {data}:{data:MatchListResult[]} = await axios.post('/api/matches/getmatches',{date: date})
        setMatches(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  },[])
  return (
    <div className="h-screen w-full ">
      <div className="bg-white mt-20 p-16 rounded-2xl flex ">
        <div className="w-fit ">
          <img
            src={imgRugbyPlayer.src}
            alt="rugbyPlayer2"
            className="main-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="w-full mt-8" >
          {/* Place to insert upcoming and upcoming matches */}
          <h2 className="text-4xl mb-4 font-bold"> Previous Matches</h2>
          <div className="text-center flex flex-col max-h-96 overflow-hidden overflow-y-auto border-t-2 border-b-2">
            {matches?.map((x, r) => (
              <HomeMatch
                key={r}
                matchDate={x.MatchDate}
                homeTeam={x.HomeTeam.TeamName}
                homeScore={x.HomeScore}
                homeFlag={x.HomeTeam.Flag}
                awayFlag={x.AwayTeam.Flag}
                awayScore={x.AwayScore}
                awayTeam={x.AwayTeam.TeamName}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            {/* Additional content can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;