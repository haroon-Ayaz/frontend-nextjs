'use client'

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Star, TrendingUp, Medal } from "lucide-react"

// Dummy data for clinicians
const clinicians = [
    {
        id: 1,
        name: "Dr. Sarah Mitchell",
        avatar: "/placeholder.svg?height=100&width=100",
        specialty: "Neurologist",
        rating: 4.9,
        patientsThisMonth: 145,
        dischargeRate: 92,
        experience: "12 years",
        availability: "Full-time",
        performanceData: [65, 72, 78, 82, 85, 92]
    },
    {
        id: 2,
        name: "Dr. James Wilson",
        avatar: "/placeholder.svg?height=100&width=100",
        specialty: "Cardiologist",
        rating: 4.8,
        patientsThisMonth: 128,
        dischargeRate: 88,
        experience: "15 years",
        availability: "Part-time",
        performanceData: [70, 68, 74, 78, 84, 88]
    },
    {
        id: 3,
        name: "Dr. Emily Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        specialty: "Pediatrician",
        rating: 4.7,
        patientsThisMonth: 156,
        dischargeRate: 90,
        experience: "8 years",
        availability: "Full-time",
        performanceData: [60, 75, 82, 85, 88, 90]
    }
]

// Performance data for the graph
const performanceData = [
    { week: 'Week 1', Mitchell: 65, Wilson: 70, Chen: 60 },
    { week: 'Week 2', Mitchell: 72, Wilson: 68, Chen: 75 },
    { week: 'Week 3', Mitchell: 78, Wilson: 74, Chen: 82 },
    { week: 'Week 4', Mitchell: 82, Wilson: 78, Chen: 85 },
    { week: 'Week 5', Mitchell: 85, Wilson: 84, Chen: 88 },
    { week: 'Week 6', Mitchell: 92, Wilson: 88, Chen: 90 },
]

export default function CliniciansOverview() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Clinicians Overview</h1>
                    <p className="text-muted-foreground">
                        Performance metrics and patient statistics for our top clinicians
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {clinicians.map((clinician) => (
                        <Card key={clinician.id} className="transition-all hover:shadow-lg">
                            <CardHeader className="space-y-1">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={clinician.avatar} />
                                        <AvatarFallback>{clinician.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-xl">{clinician.name}</CardTitle>
                                        <CardDescription>{clinician.specialty}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Star className="h-4 w-4 text-primary" />
                                            <span className="text-sm font-medium">{clinician.rating}</span>
                                        </div>
                                        <Badge variant="secondary">{clinician.availability}</Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <Users className="h-4 w-4" />
                                                <span>Patients</span>
                                            </div>
                                            <p className="text-2xl font-bold">{clinician.patientsThisMonth}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <TrendingUp className="h-4 w-4" />
                                                <span>Discharge Rate</span>
                                            </div>
                                            <p className="text-2xl font-bold">{clinician.dischargeRate}%</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t pt-4">
                                        <div className="flex items-center space-x-2">
                                            <Medal className="h-4 w-4 text-primary" />
                                            <span className="text-sm text-muted-foreground">Experience:</span>
                                            <span className="text-sm font-medium">{clinician.experience}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance Comparison</CardTitle>
                        <CardDescription>
                            Patient discharge rates over the last 6 weeks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={performanceData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 20,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.1} />
                                    <XAxis dataKey="week" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#18181b',
                                            border: '1px solid #27272a',
                                            borderRadius: '6px',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="Mitchell"
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                        dot={{ fill: '#ffffff' }}
                                        name="Dr. Mitchell"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Wilson"
                                        stroke="#a1a1aa"
                                        strokeWidth={2}
                                        dot={{ fill: '#a1a1aa' }}
                                        name="Dr. Wilson"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Chen"
                                        stroke="#52525b"
                                        strokeWidth={2}
                                        dot={{ fill: '#52525b' }}
                                        name="Dr. Chen"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}