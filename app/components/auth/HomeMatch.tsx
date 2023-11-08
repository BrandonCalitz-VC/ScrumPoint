import React, { FC } from "react";

interface homeMatchProps {
  homeFlag: string;
  homeTeam: string;
  homeScore: number;
  awayFlag: string;
  awayTeam: string;
  awayScore: number;
}

const HomeMatch: FC<homeMatchProps> = ({
  homeFlag,
  awayFlag,
  homeTeam,
  homeScore,
  awayScore,
  awayTeam,
}) => {
  return (
    <div
      className="MatchBox"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <div
        className="Team1"
        style={{ display: "flex", alignItems: "center", flex: 1 }}
      >
        <img
          src={homeFlag}
          alt="Team 1 Flag"
          style={{ width: "30px", height: "30px" }}
        />
        <span style={{ margin: "0 10px" }}>{homeTeam}</span>
        <span style={{ margin: "0 5px" }}>{homeScore}</span>
        <div
          className="DiagonalRectangles"
          style={{
            width: "30px",
            height: "10px",
            border: "1px solid #000",
            transform: "rotate(-45deg)",
            margin: "0 5px",
          }}
        ></div>
        <div
          className="DiagonalRectangles"
          style={{
            width: "30px",
            height: "10px",
            border: "1px solid #000",
            transform: "rotate(-45deg)",
            margin: "0 5px",
          }}
        ></div>
        <div
          className="DiagonalRectangles"
          style={{
            width: "30px",
            height: "10px",
            border: "1px solid #000",
            transform: "rotate(-45deg)",
            margin: "0 5px",
            color: "blue",
          }}
        ></div>
      </div>
      <div
        className="Team2"
        style={{ display: "flex", alignItems: "center", flex: 1 }}
      >
        <span style={{ margin: "0 5px" }}>{homeScore}</span>
        <span style={{ margin: "0 10px" }}>{homeTeam}</span>
        <img
          src={awayFlag}
          alt="Team 2 Flag"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    </div>
  );
};

export default HomeMatch;
