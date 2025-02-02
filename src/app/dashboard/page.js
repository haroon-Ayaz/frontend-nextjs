"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {CalendarIcon, ActivityIcon, FileTextIcon, PhoneIcon} from "lucide-react"
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import AddPatient from "@/app/dashboard/components/addPatient";
import WaitingList from "@/app/dashboard/components/waitingList";
import AllList from "@/app/dashboard/components/allList";
import ProcedureList from "@/app/dashboard/components/procedures";
import DischargeList from "@/app/dashboard/components/dischargedPatients";

export default function Dashboard() {
    const [role, setRole] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [stats, setStats] = React.useState({});
    const [cli, setCli] = React.useState([]);
    const [cliTtl, setCliTtl] = React.useState(0);
    const router = useRouter();
    const [fname, setFname] = React.useState("");

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedEmail = localStorage.getItem("userEmail");
        const storedFname = localStorage.getItem("fname");
        if (!storedRole) {
            router.push("/auth/login");
        } else {
            setRole(storedRole);
            setEmail(storedEmail);
            setFname(storedFname);
        }
    }, [router]);

    const fetchStatistics = async () => {
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/get_statistics");
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    const fetchClinicians = async () => {
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/get_clinicians");
            const data = await response.json();
            setCliTtl(data["total_clinicians"]);
            // setCli(data["clinicians"])
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    useEffect(() => {
        fetchClinicians(); // Fetch initially
        const interval = setInterval(fetchClinicians, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [])

    console.log("Total CLinicians: ", cliTtl);

    useEffect(() => {
        fetchStatistics(); // Fetch initially
        const interval = setInterval(fetchStatistics, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [])


    if (!role) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">NHS Healthcare Dashboard</h1>
                    <p className="text-lg">Welcome {fname}, You are logged in as {role}</p>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">All Waiting List</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats["total_waiting"]}</div>
                            <p className="text-xs text-gray-500">Next: Dr. Smith, 15 Jun</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">On-going Procedures</CardTitle>
                            <FileTextIcon className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats["total_procedures"]}</div>
                            <p className="text-xs text-gray-500">Last updated: 1 week ago</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Discharged Patients</CardTitle>
                            <ActivityIcon className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats["total_discharged"]}</div>
                            <p className="text-xs text-gray-500">Blood work, 3 days ago</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Clinicians</CardTitle>
                            <PhoneIcon className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cliTtl}</div>
                            <p className="text-xs text-gray-500">2 unread</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Tabs defaultValue="total-waiting-list" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="all-list">All Patients</TabsTrigger>
                            <TabsTrigger value="total-waiting-list">Waiting List</TabsTrigger>
                            <TabsTrigger value="procedures">Procedures</TabsTrigger>
                            <TabsTrigger value="discharged">Discharged</TabsTrigger>
                            {(role === "Admin" || role === "Super User") &&
                                <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
                            }
                        </TabsList>
                        <TabsContent value="appointments" className="space-y-4">
                            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
                            <div className="space-y-2">
                                <AppointmentItem
                                    doctor="Dr. Emily Smith"
                                    specialty="General Practitioner"
                                    date="15 June 2023"
                                    time="10:00 AM"
                                />
                                <AppointmentItem
                                    doctor="Dr. Michael Johnson"
                                    specialty="Cardiologist"
                                    date="22 June 2023"
                                    time="2:30 PM"
                                />
                                <AppointmentItem doctor="Dr. Sarah Lee" specialty="Dermatologist" date="1 July 2023" time="11:15 AM" />
                            </div>
                        </TabsContent>

                        <TabsContent value="all-list">
                            <AllList />
                        </TabsContent>

                        <TabsContent value="total-waiting-list">
                            <WaitingList />
                        </TabsContent>

                        <TabsContent value="procedures">
                            <ProcedureList />
                        </TabsContent>

                        <TabsContent value="add-patient">
                            <AddPatient/>
                        </TabsContent>

                        <TabsContent value="discharged">
                            <DischargeList />
                        </TabsContent>

                    </Tabs>
                </div>

                {/*<div className="mt-8">*/}
                {/*    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>*/}
                {/*    <div className="flex flex-wrap gap-4">*/}
                {/*        <Button variant="outline">Book Appointment</Button>*/}
                {/*        <Button variant="outline">Request Prescription Refill</Button>*/}
                {/*        <Button variant="outline">View Medical Records</Button>*/}
                {/*        <Button variant="outline">Contact Support</Button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>

            <footer className="bg-gray-100 text-center p-4 mt-8">
                <p className="text-sm text-gray-600">© 2025 NHS Healthcare. All rights reserved.</p>
            </footer>
        </div>
    )
}

function AppointmentItem({ doctor, specialty, date, time }) {
    return (
        <Card>
            <CardContent className="flex justify-between items-center p-4">
                <div>
                    <h3 className="font-semibold">{doctor}</h3>
                    <p className="text-sm text-gray-500">{specialty}</p>
                </div>
                <div className="text-right">
                    <p className="font-medium">{date}</p>
                    <p className="text-sm text-gray-500">{time}</p>
                </div>
            </CardContent>
        </Card>
    )
}

