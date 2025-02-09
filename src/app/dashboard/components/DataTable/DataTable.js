"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/app/dashboard/components/DataTable/TableSkeleton";

function getStatusVariant(status) {
    switch (status.toLowerCase()) {
        case "waiting":
            return "warning";
        case "under procedure":
            return "default";
        case "discharged":
            return "success";
        default:
            return "secondary";
    }
}

export default function DataTable({
  columns,
  data,
  role,
  extraProps = {}
}) {

  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setTableData(data)
      setIsLoading(false)
    }, 1500) // Adjust this delay as needed

    return () => clearTimeout(timer)
  }, [data])

  if (isLoading) {
    return <TableSkeleton columns={columns} />
  }

    return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}
            >
              {columns.map((col) => (
                <TableCell key={col.id} className="py-4 px-4 text-sm text-gray-900">
                  {col.render
                    ? col.render(row, extraProps)
                    : col.id === "status"
                      ? <Badge variant={getStatusVariant(row[col.id])} className="font-medium">{row[col.id]}</Badge>
                      : row[col.id]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
