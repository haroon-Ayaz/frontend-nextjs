import React, { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    X,
    LayoutGrid,
    LayoutList,
    Search,
    Calendar,
    MessageSquare,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function TableComponent({ columns, data, role, clinicians, onAssignPatient }) {
    const [filters, setFilters] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState("standard")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState("")
    const itemsPerPage = 10

    const compactColumns = columns.filter((col) => ["rxkid", "fname", "sname", "problem"].includes(col.id))

    const activeColumns = viewMode === "standard" ? columns : compactColumns

    // Rest of the state management code remains the same
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

    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return Object.values(filters).every((filter) => {
                const cellValue = String(row[filter.column]).toLowerCase()
                return cellValue.includes(filter.value.toLowerCase())
            })
        })
    }, [data, filters])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleAssign = (patient) => {
        setSelectedPatient(patient)
    }

    const confirmAssignment = (clinician) => {
        if (selectedPatient && appointmentDate && appointmentTime) {
            onAssignPatient(selectedPatient.rxkid, clinician, appointmentDate, appointmentTime)
            setSelectedPatient(null)
            setAppointmentDate(new Date())
            setAppointmentTime("")
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
                                    <LayoutGrid className="h-4 w-4" />
                                    Standard
                                </TabsTrigger>
                                <TabsTrigger value="compact" className="flex items-center gap-2">
                                    <LayoutList className="h-4 w-4" />
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
                            <Filter className="h-4 w-4" />
                            Add Filter
                        </Button>
                        <Select defaultValue={viewMode} onValueChange={setViewMode} className="md:hidden">
                            <SelectTrigger className="w-[130px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Standard
                  </span>
                                </SelectItem>
                                <SelectItem value="compact">
                  <span className="flex items-center gap-2">
                    <LayoutList className="h-4 w-4" />
                    Compact
                  </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <AnimatePresence>
                    {Object.keys(filters).length > 0 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3 mb-6"
                        >
                            {Object.entries(filters).map(([id, filter]) => (
                                <motion.div
                                    key={id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <Search className="h-4 w-4 text-gray-500" />
                                    <Select value={filter.column} onValueChange={(value) => updateFilter(id, "column", value)}>
                                        <SelectTrigger className="w-[200px] bg-white">
                                            <SelectValue placeholder="Select column" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {columns.map((col) => (
                                                <SelectItem key={col.id} value={col.id}>
                                                    {col.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        placeholder="Filter value"
                                        value={filter.value}
                                        onChange={(e) => updateFilter(id, "value", e.target.value)}
                                        className="flex-grow bg-white"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFilter(id)}
                                        className="hover:bg-gray-200 hover:text-red-600 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                            <Separator className="my-6" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                {activeColumns.map((col) => (
                                    <TableHead
                                        key={col.id}
                                        className="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {col.label}
                                    </TableHead>
                                ))}
                                {(role === "Admin" || role === "Super User") && (
                                    <TableHead className="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assign To
                                    </TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((row, rowIndex) => (
                                <TableRow
                                    key={row.id}
                                    className={`
                    ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-blue-50 transition-colors duration-150
                  `}
                                >
                                    {activeColumns.map((col) => (
                                        <TableCell key={col.id} className="py-4 px-4 text-sm text-gray-900">
                                            {col.id === "status" ? (
                                                <Badge variant={getStatusVariant(row[col.id])} className="font-medium">
                                                    {row[col.id]}
                                                </Badge>
                                            ) : (
                                                row[col.id]
                                            )}
                                        </TableCell>
                                    ))}
                                    {(role === "Admin" || role === "Super User") && (
                                        <TableCell className="py-4 px-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={() => handleAssign(row)}>
                                                        Assign
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Assign Patient to Clinician</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="clinician" className="text-right">
                                                                Clinician
                                                            </Label>
                                                            <Select onValueChange={(value) => confirmAssignment(value)}>
                                                                <SelectTrigger className="w-[180px] col-span-3">
                                                                    <SelectValue placeholder="Select clinician" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {clinicians.map((c) => (
                                                                        <SelectItem key={c} value={c}>
                                                                            {c}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="date" className="text-right">
                                                                Date
                                                            </Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={`w-[280px] justify-start text-left font-normal col-span-3 ${
                                                                            !appointmentDate && "text-muted-foreground"
                                                                        }`}
                                                                    >
                                                                        <Calendar className="mr-2 h-4 w-4" />
                                                                        {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0">
                                                                    <CalendarComponent
                                                                        mode="single"
                                                                        selected={appointmentDate}
                                                                        onSelect={setAppointmentDate}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="time" className="text-right">
                                                                Time
                                                            </Label>
                                                            <Input
                                                                id="time"
                                                                type="time"
                                                                value={appointmentTime}
                                                                onChange={(e) => setAppointmentTime(e.target.value)}
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={() => confirmAssignment()}>
                                                            Confirm Assignment
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Appointment Reminder Preview */}
                {selectedPatient && appointmentDate && appointmentTime && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                            Appointment Reminder Preview
                        </h3>
                        <p className="text-sm text-gray-700">
                            SWBH Endoscopy Appointment Reminder: Hi {selectedPatient.fname}, this is a reminder that you have a
                            procedure booked for {format(appointmentDate, "dd/MM/yyyy")} at {appointmentTime}.
                        </p>
                        <p className="text-sm text-gray-700 mt-2">Please respond back with CANCEL if no longer needed.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                        <span className="font-medium">{filteredData.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((page) => {
                                const distance = Math.abs(page - currentPage)
                                return distance === 0 || distance === 1 || page === 1 || page === totalPages
                            })
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 text-gray-500">...</span>}
                                    <Button
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className="h-8 w-8 p-0"
                                    >
                                        {page}
                                    </Button>
                                </React.Fragment>
                            ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function getStatusVariant(status) {
    switch (status.toLowerCase()) {
        case "waiting":
            return "warning"
        case "under procedure":
            return "default"
        case "discharged":
            return "success"
        default:
            return "secondary"
    }
}

