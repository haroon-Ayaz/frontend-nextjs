'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Clock, User, Stethoscope, Activity, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import TableComponent from "@/app/dashboard/components/TableComponent"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp } from "lucide-react"

// Mock data for demonstration
const mockData = [
    {
        id: 101,
        title: "Mr.",
        fname: "Molly",
        lname: "Romero",
        address: "8571 Kim Fort Apt. 067\nRichardsonhaven, MI 48201",
        phone_number: "+1-564-767-9278x59597",
        problem: "Safe leg second like significant.",
        status: "Procedure",
        rxkid: "RXK351422",
        assignto: "Ethan Hunt",
        specialty: "Gastroenterology",
        waitTime: "2h 15m"
    },
    {
        id: 102,
        title: "Mrs.",
        fname: "Sarah",
        lname: "Johnson",
        address: "123 Main St\nNew York, NY 10001",
        phone_number: "+1-212-555-1234",
        problem: "Abdominal pain",
        status: "Consultation",
        rxkid: "RXK351423",
        assignto: "John Doe",
        specialty: "Colonoscopy",
        waitTime: "1h 30m"
    },
    {
        id: 103,
        title: "Dr.",
        fname: "Michael",
        lname: "Smith",
        address: "456 Elm St\nLos Angeles, CA 90001",
        phone_number: "+1-213-555-5678",
        problem: "Difficulty swallowing",
        status: "Procedure",
        rxkid: "RXK351424",
        assignto: "Jane Smith",
        specialty: "Endoscopy",
        waitTime: "3h 45m"
    }
]

// Color scheme for status badges
const statusColors = {
    Procedure: "bg-blue-500",
    Consultation: "bg-green-500",
    Pending: "bg-yellow-500",
    Completed: "bg-purple-500"
}

// Pie chart data
const pieData = [
    { name: 'Procedure', value: 40 },
    { name: 'Consultation', value: 30 },
    { name: 'Pending', value: 20 },
    { name: 'Completed', value: 10 }
]

const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#a855f7']

const columns = [
    {
        id: "patient",
        label: "Patient",
        render: (patient) => (
            <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&name=${patient.fname}+${patient.lname}`} />
                    <AvatarFallback>
                        {patient.fname[0]}{patient.lname[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">
                        {patient.title} {patient.fname} {patient.lname}
                    </p>
                    <p className="text-sm text-muted-foreground">{patient.problem}</p>
                </div>
            </div>
        ),
    },
    {
        id: "status",
        label: "Status",
        render: (patient) => (
            <Badge className={statusColors[patient.status]}>
                {patient.status}
            </Badge>
        ),
    },
    {
        id: "assignto",
        label: "Assigned To",
        render: (patient) => patient.assignto,
    },
];



export default function WaitingList() {
    const [data, setData] = useState(mockData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [progress, setProgress] = React.useState(65) // Today's progress

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch("https://flask-nine-green.vercel.app/api/getdata")
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Endoscopy Waiting List</h1>
                    <p className="text-muted-foreground">
                        Manage and monitor patients waiting for endoscopy procedures
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Statistics Cards */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">142</div>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2h 15m</div>
                            <p className="text-xs text-muted-foreground">-8% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Procedures Today</CardTitle>
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Patients Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Specialty</TableHead>
                                        <TableHead>Wait Time</TableHead>
                                        <TableHead>Assigned To</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((patient) => (
                                        <TableRow key={patient.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={`/placeholder.svg?height=40&width=40&name=${patient.fname}+${patient.lname}`} />
                                                        <AvatarFallback>{patient.fname[0]}{patient.lname[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{patient.title} {patient.fname} {patient.lname}</p>
                                                        <p className="text-sm text-muted-foreground">{patient.problem}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusColors[patient.status]}>
                                                    {patient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{patient.specialty}</TableCell>
                                            <TableCell>{patient.waitTime}</TableCell>
                                            <TableCell>{patient.assignto}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table> */}

  // Then use your TableComponent by passing the columns and data props:
                            <TableComponent columns={columns} data={data} />
                        </CardContent>
                    </Card>

                    {/* Statistics Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Procedure Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                border: '1px solid #27272a',
                                                borderRadius: '6px',
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>


                            {/* Progress Section */}
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">Today's Progress</h3>
                                    </div>
                                    <span className="text-sm text-muted-foreground">65% completed</span>
                                </div>

                                <Progress value={progress} className="h-3 bg-gradient-to-r from-primary to-[#a855f7]" />

                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>24 procedures scheduled</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>Average wait: 2h 15m</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        <span>+8% from yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}