"use client"

import { TableHeader } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { format } from "date-fns"

// Define fixed widths for each column type
const columnWidths = {
  actions: "w-[180px] min-w-[180px]",
  showDetails: "w-[120px] min-w-[120px]",
  id: "w-16 min-w-16",
  forename: "w-32 min-w-32",
  surname: "w-32 min-w-32",
  waitlist_name: "w-48 min-w-48",
  test_type: "w-32 min-w-32",
  test_type_main: "w-40 min-w-40",
  rxkid: "w-28 min-w-28",
  reporting_status: "w-36 min-w-36",
  points: "w-20 min-w-20",
  requires_pre_add: "w-36 min-w-36",
  key_code: "w-40 min-w-40",
  comment: "w-64 min-w-64",
  dated: "w-24 min-w-24",
  sub_type: "w-32 min-w-32",
  referral_priority: "w-40 min-w-40",
  date_added_to_wl: "w-40 min-w-40",
  adj_wl_start: "w-40 min-w-40",
  remvl_dttm: "w-40 min-w-40",
  weeks_wait: "w-28 min-w-28",
  current_rtt_waits: "w-48 min-w-48",
  indication: "w-64 min-w-64",
  appointment_date: "w-40 min-w-40",
  appt_by_date_ipm: "w-40 min-w-40",
  appt_by_date_calculated: "w-48 min-w-48",
  short_notice_flag: "w-32 min-w-32",
}

const formatDate = (dateString) => {
  if (dateString === "N/A") {
    return "N/A"
  }
  try {
    return format(new Date(dateString), "dd MMM yyyy HH:mm")
  } catch {
    return dateString
  }
}

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

export default function DataTable({ columns, data, role, extraProps = {} }) {
  const [isLoading, setIsLoading] = useState(true)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTableData(data)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [data])

  const renderCellContent = (column, row) => {
    const value = row[column.id]

    if (column.render) {
      return column.render(row, extraProps)
    }

    if (value === "N/A") {
      return <span className="text-gray-400 italic">N/A</span>
    }

    if (
      ["date_added_to_wl", "adj_wl_start", "appointment_date", "appt_by_date_ipm", "appt_by_date_calculated"].includes(
        column.id,
      )
    ) {
      return formatDate(value)
    }

    if (typeof value === "string" && value.length > 50) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">{truncateText(value, 50)}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[300px] whitespace-normal">
              <p className="break-words">{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return value
  }

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    "py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap",
                    columnWidths[col.id] || "w-40 min-w-40",
                    {
                      "sticky left-0 z-10 bg-gray-50": col.id === "actions",
                      "sticky right-0 z-10 bg-gray-50": col.id === "showDetails",
                    },
                  )}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    className={cn("py-4 px-4 text-sm text-gray-900", columnWidths[col.id] || "w-40 min-w-40", {
                      "sticky left-0 z-10": col.id === "actions",
                      "sticky right-0 z-10": col.id === "showDetails",
                      "bg-white": rowIndex % 2 === 0 && (col.id === "actions" || col.id === "showDetails"),
                      "bg-gray-50": rowIndex % 2 !== 0 && (col.id === "actions" || col.id === "showDetails"),
                      "hover:bg-blue-50": col.id === "actions" || col.id === "showDetails",
                    })}
                  >
                    {renderCellContent(col, row)}
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

