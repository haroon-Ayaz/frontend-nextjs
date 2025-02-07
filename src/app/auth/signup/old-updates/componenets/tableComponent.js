"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import FilterBar from "./FilterBar"
import DataTable from "./DataTable"
import Pagination from "./Pagination"

export default function TableComponent({ columns, data, role, clinicians, onAssignPatient }) {
    const [filters, setFilters] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState("standard")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState("")
    const [editingPatient, setEditingPatient] = useState(null)
    const [viewingPatient, setViewingPatient] = useState(null)
    const itemsPerPage = 10

    // Decide which columns to show based on view mode.
    const compactColumns = columns.filter((col) => ["rxkid", "fname", "sname", "problem"].includes(col.id))
    const activeColumns = viewMode === "standard" ? columns : [...compactColumns, { id: "details", label: "Details" }]

    // Filter management
    const addFilter = () => {
        const newFilter = { column: columns[0].id, value: "" }
        setFilters((prev) => ({ ...prev, [Date.now()]: newFilter }))
    }

    const updateFilter = (id, field, value) => {
        setFilters((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }))
        setCurrentPage(1)
    }

    const removeFilter = (id) => {
        setFilters((prev) => {
            const newFilters = { ...prev }
            delete newFilters[id]
            return newFilters
        })
    }

    // Filtering the data
    const filteredData = useMemo(() => {
        return data.filter((row) =>
            Object.values(filters).every((filter) =>
                String(row[filter.column]).toLowerCase().includes(filter.value.toLowerCase()),
            ),
        )
    }, [data, filters])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Handler for opening the assignment dialog.
    const handleAssign = (patient) => {
        setSelectedPatient(patient)
    }

    // Called when the assignment is confirmed in the dialog.
    const confirmAssignment = (clinician) => {
        if (selectedPatient && appointmentDate && appointmentTime) {
            onAssignPatient(selectedPatient.rxkid, clinician, appointmentDate, appointmentTime)
            setSelectedPatient(null)
            setAppointmentDate(new Date())
            setAppointmentTime("")
        }
    }

    const getStatusVariant = (status) => {
        switch (status) {
            case "Active":
                return "success"
            case "Inactive":
                return "danger"
            default:
                return "default"
        }
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
                            onClick={addFilter}
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
                <FilterBar filters={filters} columns={columns} updateFilter={updateFilter} removeFilter={removeFilter} />
                {Object.keys(filters).length > 0 && <Separator className="my-6" />}
                <DataTable
                    columns={activeColumns}
                    data={paginatedData}
                    role={role}
                    clinicians={clinicians}
                    handleAssign={handleAssign}
                    appointmentDate={appointmentDate}
                    appointmentTime={appointmentTime}
                    setAppointmentDate={setAppointmentDate}
                    setAppointmentTime={setAppointmentTime}
                    confirmAssignment={confirmAssignment}
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

