"use client"
import { LeaderboardListResult } from "@/app/api/leaderboard/getleaderboardlist/route";
import { PoolCountries } from "@/app/api/pools/getPoolCountries/route";
import Table from "@/app/components/Table";
import { Users } from "@prisma/client";
import { Column, createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";


export default function Leaderboard() {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    (async () => {
      try {
        const {data:leaderboard} = await axios.post('/api/leaderboard/getleaderboardlist');
        
        setData(leaderboard)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  },[])

  const columnHelper = createColumnHelper<LeaderboardListResult>();
  const columns = [

    columnHelper.accessor('pos', {
      header: () => '',
      cell: (info)=> <div className="p-3">{info.getValue()}</div>,
      footer: props => props.column.id,
      size : 0
    }),
    columnHelper.accessor('username', {
      header: () => 'USER',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
    }),
    columnHelper.accessor('guesed', {
      header: () => 'GUESSED',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 10
    }),
    columnHelper.accessor('points', {
      header: () => 'POINTS',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 10
    }),
  ]


  const table = useReactTable(
    { 
      columns,
      data ,
      getCoreRowModel: getCoreRowModel(),
    });
  return (
    <main className="h-full w-full py-10">
      <div className=" h-full w-full  rounded-3xl border-4 flex flex-col p-3 px-10 bg-black bg-opacity-70 ">
        <div className="text-4xl font-bold text-white bg-blue-400 text-center p-4 mx-40 rounded-lg">LEADERBOARD</div>
        <Table table={table}/>
      </div>
    </main>
  )
}