"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/app/dashboard/components/DataTable/TableSkeleton";
import { cn } from "@/lib/utils";

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

// Column width configurations
const columnWidths = {
  title: "w-20", // Title is usually short
  fname: "w-32", // First name
  sname: "w-32", // Last name
  address: "max-w-[250px]", // Address needs more space but should be limited
  postCode: "w-24", // Post code is fixed length
  phoneNumber: "w-40", // Phone numbers have consistent length
  homeNumber: "w-40", // Home numbers have consistent length
  problem: "max-w-[200px]", // Problem description should be limited
  assignTo: "w-32", // Assigned person name
  status: "w-28", // Status with badge
  serialNumber: "w-16", // Serial number is usually short
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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    "py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap",
                    columnWidths[col.id],
                  )}
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
                  <TableCell
                    key={col.id}
                    className={cn("py-4 px-4 text-sm text-gray-900", columnWidths[col.id], {
                      truncate: ["address", "problem"].includes(col.id),
                    })}
                  >
                    {col.render ? (
                      col.render(row, extraProps)
                    ) : col.id === "serialNumber" ? (
                      rowIndex + 1
                    ) : col.id === "status" ? (
                      <Badge variant={getStatusVariant(row[col.id])} className="font-medium">
                        {row[col.id]}
                      </Badge>
                    ) : (
                      <div className={cn({ truncate: ["address", "problem"].includes(col.id) })}>{row[col.id]}</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
