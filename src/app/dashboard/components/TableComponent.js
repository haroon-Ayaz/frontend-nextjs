"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import FilterBar from "@/app/dashboard/components/DataTable/FilterBar"
import Pagination from "@/app/dashboard/components/DataTable/Pagination"
import useFilters from "@/hooks/useFilters";
import usePagination from "@/hooks/usePagination";
import DataTable from "@/app/dashboard/components/DataTable/DataTable";

export default function TableComponent({ columns, data, role, clinicians, onAssignPatient }) {
  const [viewMode, setViewMode] = React.useState("standard")
  const [selectedPatient, setSelectedPatient] = React.useState(null)
  const [appointmentDate, setAppointmentDate] = React.useState(new Date())
  const [appointmentTime, setAppointmentTime] = React.useState("")

  // Move the useFilters hook call above the filteredData useMemo
  const { filters, addFilter, updateFilter, removeFilter } = useFilters();

    const filteredData = React.useMemo(() => {
      if (!Array.isArray(data)) return [];
      return data.filter((row) =>
        Object.values(filters).every((filter) => {
          const rowValue = row[filter.column];
          return rowValue && String(rowValue).toLowerCase().includes(filter.value.toLowerCase());
        })
      );
    }, [data, filters]);

    const itemsPerPage = 10;
    const { currentPage, setCurrentPage, totalPages, paginatedData } = usePagination(filteredData, itemsPerPage);


  // Decide which columns to show based on view mode.
  const columnsArray = Array.isArray(columns) ? columns : Object.values(columns)
  const compactColumns = columnsArray.filter(
    (col) => col && ["rxkid", "fname", "sname", "problem"].includes(col.id)
  )
  const activeColumns = viewMode === "compact" ? compactColumns : columnsArray

  // Handler for opening the assignment dialog.
  const handleAssign = (patient) => {
    setSelectedPatient(patient)
  }



  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      <CardHeader className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Patient Data</CardTitle>
            <Tabs value={viewMode} onValueChange={setViewMode} className="hidden md:block">
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="standard" className="flex items-center gap-2">
                  Standard
                </TabsTrigger>
                <TabsTrigger value="compact" className="flex items-center gap-2">
                  Compact
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => addFilter(columns[0].id)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              Add Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <FilterBar
          filters={filters}
          columns={columns}
          updateFilter={updateFilter}
          removeFilter={removeFilter}
        />

        {Object.keys(filters).length > 0 && <Separator className="my-6" />}

        <DataTable
          columns={activeColumns}
          data={paginatedData}
          role={role}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={filteredData.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}
