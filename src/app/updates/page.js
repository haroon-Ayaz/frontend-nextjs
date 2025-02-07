"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ActivityIcon, FileTextIcon, UsersIcon, LayoutDashboardIcon } from "lucide-react"
//import AddPatient from "@/app/updates/utils/addPatient"
//import AllList from "@/app/updates/utils/allPatients"
//import ProcedureList from "@/app/updates/utils/procedures"
// import DischargeList from "@/app/dashboard/components/dischargedPatients"
//import WaitingList from "@/app/updates/utils/waitingList"
import { fetchData } from "@/app/updates/utils/utils"
import AllList from "@/app/updates/services/patients/allPatients";
import useRole from "@/hooks/useRole";

export default function Dashboard() {
    const role = useRole();
    const [email, setEmail] = useState("")
    const [stats, setStats] = useState({})
    const [cli, setCli] = useState([])
    const [cliTtl, setCliTtl] = useState(0)
    const [fname, setFname] = useState("")
    const router = useRouter()

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail")
        const storedFname = localStorage.getItem("fname")
        setEmail(storedEmail)
        setFname(storedFname)
    }, [])

    useEffect(() => {
        const fetchClinicians = async () => {
            const data = await fetchData("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/get_clinicians")
            setCli(data.clinicians)
            setCliTtl(data.total_clinicians)
        }

        const fetchStatistics = async () => {
            const data = await fetchData("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/get_statistics")
            setStats(data)
        }

        fetchClinicians()
        fetchStatistics()

        const interval = setInterval(() => {
            fetchClinicians()
            fetchStatistics()
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    if (!role) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    const StatCard = ({ title, value, icon: Icon, subtext }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{subtext}</p>
            </CardContent>
        </Card>
    )

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="max-w-7xl mx-auto flex h-16 items-center justify-between py-">
                    <div className="flex items-center space-x-4">
                        <LayoutDashboardIcon className="h-6 w-6" />
                        <h1 className="text-xl font-bold">NHS Healthcare Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">Welcome, {fname}</span>
                        <span className="text-sm font-semibold">{role}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto py-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard
                        title="Waiting List"
                        value={stats.total_waiting || 0}
                        icon={CalendarIcon}
                        subtext="Patients waiting"
                    />
                    <StatCard
                        title="Ongoing Procedures"
                        value={stats.total_procedures || 0}
                        icon={FileTextIcon}
                        subtext="Current procedures"
                    />
                    <StatCard
                        title="Discharged Patients"
                        value={stats.total_discharged || 0}
                        icon={ActivityIcon}
                        subtext="Recently discharged"
                    />
                    <StatCard title="Active Clinicians" value={cliTtl} icon={UsersIcon} subtext="Available staff" />
                </div>

                <Tabs defaultValue="all-list" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 h-auto">
                        <TabsTrigger value="all-list">All Patients</TabsTrigger>
                        <TabsTrigger value="total-waiting-list">Waiting List</TabsTrigger>
                        <TabsTrigger value="procedures">Procedures</TabsTrigger>
                        <TabsTrigger value="discharged">Discharged</TabsTrigger>
                        {(role === "Admin" || role === "Super User") && <TabsTrigger value="add-patient">Add Patient</TabsTrigger>}
                    </TabsList>
                    <TabsContent value="all-list">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Patients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AllList />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="total-waiting-list">
                        <Card>
                            <CardHeader>
                                <CardTitle>Waiting List</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/*<WaitingList />*/}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="procedures">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ongoing Procedures</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/*<ProcedureList />*/}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="discharged">
                        <Card>
                            <CardHeader>
                                <CardTitle>Discharged Patients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/*<DischargeList />*/}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    {(role === "Admin" || role === "Super User") && (
                        <TabsContent value="add-patient">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add New Patient</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/*<AddPatient />*/}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>

            </main>

            <footer className="border-t bg-muted">
                <div className="container flex h-16 items-center justify-center">
                    <p className="text-sm text-muted-foreground">© 2025 NHS Healthcare. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}