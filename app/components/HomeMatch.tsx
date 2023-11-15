import React, { FC } from "react";
import rectangle from "@/public/Rectangles.png";

interface homeMatchProps {
  homeFlag: string;
  homeTeam: string;
  homeScore: number;
  awayFlag: string;
  awayTeam: string;
  awayScore: number;
  matchDate: string; // Assuming you have a match date in your props
}

const HomeMatch: FC<homeMatchProps> = ({
  homeFlag,
  awayFlag,
  homeTeam,
  homeScore,
  awayScore,
  awayTeam,
  matchDate,
}) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };

  
  return (
    <div>
      <p
        className="FixtureDate"
        style={{ textAlign: "left", marginTop: "15px", fontWeight: "bold" }}
      >
        {matchDate}
      </p>
      <div
        className="MatchBox"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "0px",
          marginBottom: "20px",
          border: "2px solid rgba(0, 0, 0, 1)",
          borderRadius: "5px",
          padding: "10px",
          position: "relative",
          height: "60px",
        }}
      >
        <div
          className="Team1"
          style={{ display: "flex", alignItems: "center", flex: 1 }}
        >
          <img
            src={homeFlag}
            alt="Team 1 Flag"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
            }}
          />
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {homeTeam}
          </span>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {homeScore}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={rectangle.src}
            alt="Rectangle"
            style={{
              height: "58px",
              width: "auto",
              borderTop: "1px solid rgba(0, 0, 0, 1)",
              borderBottom: "1px solid rgba(0, 0, 0, 1)",
            }}
          />
        </div>
        <div
          className="Team2"
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {awayScore}
          </span>
          <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
            {awayTeam}
          </span>
          <img
            src={awayFlag}
            alt="Team 2 Flag"
            style={{ width: "40px", height: "40px", marginLeft: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMatch;
