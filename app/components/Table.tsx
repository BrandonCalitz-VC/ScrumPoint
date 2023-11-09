import { Table, flexRender } from '@tanstack/react-table';
import React, { FC } from 'react'

interface TableProps {
  table :  Table<any>
}



const Table: FC<TableProps> = ({ table }) => {
  const rerender = React.useReducer(() => ({}), {})[1]


  return (
    <table className='text-white text-left border-separate border-spacing-y-5 '>
        <thead className='font-bold text-lg'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} {...{style:{width: header.getSize()}}}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='bg-blue-600 bg-opacity-80 rounded-3xl text-lg font-bold'>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
);
};

export default Table;