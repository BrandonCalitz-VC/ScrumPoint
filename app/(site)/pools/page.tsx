"use client"
import { PoolCountries } from "@/app/api/pools/getPoolCountries/route";
import Table from "@/app/components/Table";
import { Column, createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Varient = 'A' | 'B' | 'C' | 'D' 

export default function Home() {
  const [varient, setVarient] = useState<Varient>('A');
  const [data, setData] = useState<PoolCountries[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const pool = varient;
        const { data: teams } = await axios.post('/api/pools/getPoolCountries', { pool });

        // Sort teams by points in descending order
        const sortedTeams = teams.sort((a: PoolCountries, b: PoolCountries) => b.points - a.points);

        setData(sortedTeams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [varient]);

  const columnHelper = createColumnHelper<PoolCountries>();
  const columns = [
    columnHelper.accessor('flag', {
      header: () => '',
      cell: (info)=>{
        return (
            <div className="h-10 w-10 overflow-hidden rounded-full bg-white mx-5 my-3 flex justify-center"> 
              <Image src={info.getValue()} alt="" width={500} height={500}/>
            </div>
         )
      },
      footer: props => props.column.id,
      size: 0,
    }),
    columnHelper.accessor('country', {
      header: () => 'COUNTRY',
      cell: (info)=> <div>{info.getValue().toUpperCase()}</div>,
      footer: props => props.column.id,
      
    }),
    columnHelper.accessor('played', {
      header: () => 'PLAYED',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 0,
    }),
    columnHelper.accessor('w', {
      header: () => 'W',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 25,
    }),
    columnHelper.accessor('l', {
      header: () => 'L',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 50,
    }),
    columnHelper.accessor('points', {
      header: () => 'POINTS',
      cell: (info)=> <div>{info.getValue()}</div>,
      footer: props => props.column.id,
      size: 50,
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
      <div className=" h-full w-full  rounded-3xl border-4 flex flex-col p-3 px-10 bg-black bg-opacity-70">
        <div className="flex justify-between rounded-2xl bg-white text-3xl mx-20 text-center overflow-hidden">
         <div 
         onClick={()=>setVarient('A')}
         className={clsx(
          "w-full hover:bg-neutral-400 py-4 cursor-pointer",
          varient === 'A' && "bg-neutral-300"
          )}>
          Pool A
         </div>
         <div 
         onClick={()=>setVarient('B')}
         className={clsx(
          "w-full hover:bg-neutral-400 py-4 cursor-pointer",
          varient === 'B' && "bg-neutral-300"
          )}>
          Pool B
         </div>
         <div 
         onClick={()=>setVarient('C')}
         className={clsx(
          "w-full hover:bg-neutral-400 py-4 cursor-pointer",
          varient === 'C' && "bg-neutral-300"
          )}>
          Pool C
         </div>
         <div 
         onClick={()=>setVarient('D')}
         className={clsx(
          "w-full hover:bg-neutral-400 py-4 cursor-pointer",
          varient === 'D' && "bg-neutral-300"
          )}>
          Pool D
         </div>
        </div>
        <Table table={table}/>
      </div>
    </main>
  )
}