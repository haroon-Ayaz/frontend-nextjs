"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ActivityIcon, FileTextIcon, UsersIcon, LayoutDashboardIcon } from "lucide-react"
import useCurrentUser from "@/hooks/useUser"
import { getStatistics, getClinicians, getPatients } from "@/app/api/actions"
import { useQuery } from "@tanstack/react-query"
import StatsCard from "@/app/dashboard/components/StatsCard"
import AllPatientsList from "@/app/dashboard/service/AllPatientsList"
import WaitingList from "@/app/dashboard/service/patient/WaitingList"
import { SkeletonLoader } from "@/app/dashboard/components/SkeletonLoader"
import AddPatient from "@/app/dashboard/components/AddPatient"
import DischargePatient from "@/app/dashboard/service/clinician/ProceduresPatients"
import DischargePatientsList from "@/app/dashboard/service/DischargePatients";
import Link from "next/link";

export default function Dashboard() {
  const { role, email, fname } = useCurrentUser()

  const {
    data: stats,
    isLoading: loadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
    refetchInterval: 2000,
  })

  const {
    data: patients,
    isLoading: loadingPatients,
    error: errorPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    refetchInterval: 2000,
  })


  console.log("Patients are: ", patients)

  const {
    data: clinicians,
    isLoading: loadingClinicians,
    error: errorClinicians,
  } = useQuery({
    queryKey: ["clinicians"],
    queryFn: getClinicians,
    refetchInterval: 2000,
  })

  if (!role || loadingStats || loadingClinicians) {
    return <SkeletonLoader />
  }

  if (errorStats || errorClinicians) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error loading data</div>
  }

  const statsData = [
    {
      title: "Waiting List",
      value: stats?.total_waiting || 0,
      Icon: CalendarIcon,
      subtext: "Patients waiting",
    },
    {
      title: "Ongoing Procedures",
      value: stats?.total_procedures || 0,
      Icon: FileTextIcon,
      subtext: "Current procedures",
    },
    {
      title: "Discharged Patients",
      value: stats?.total_discharged || 0,
      Icon: ActivityIcon,
      subtext: "Recently discharged",
    },
    {
      title: "Active Clinicians",
      value: clinicians?.total_clinicians || 0,
      Icon: UsersIcon,
      subtext: "Available staff",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
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

      <div className="flex-1 max-w-7xl mx-auto w-full px-4">
        {/* Stats Section - Fixed height, independent of other content */}
        <div className="py-6 bg-background relative z-40">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => {
              const card = <StatsCard key={index} {...stat} />;
              if (stat.title === "Waiting List") {
                return (
                  <Link href="/test/wlp" key={index}>
                    {card}
                  </Link>
                );
              } else if (stat.title === "Active Clinicians") {
                return (
                  <Link href="/test/cli" key={index}>
                    {card}
                  </Link>
                );
              }
              return card;
            })}


            {/* <StatsCard
              title={statsData[0].title}
              value={statsData[0].value}
              icon={statsData[0].Icon}
              subtext={statsData[0].subtext}
            /> */}

            {/* <StatsCard
              title={statsData[1].title}
              value={statsData[1].value}
              icon={statsData[1].Icon}
              subtext={statsData[1].subtext}
            />

            <StatsCard
              title={statsData[2].title}
              value={statsData[2].value}
              icon={statsData[2].Icon}
              subtext={statsData[2].subtext}
            />

            <StatsCard
              title={statsData[3].title}
              value={statsData[3].value}
              icon={statsData[3].Icon}
              subtext={statsData[3].subtext}
            /> */}

          </div>
        </div>

        {/* Tabs Section - Scrollable content */}
        <div className="relative z-30 pb-6">
          <Tabs defaultValue="all-list" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 h-auto">
              <TabsTrigger value="all-list">All Patients</TabsTrigger>
              <TabsTrigger value="total-waiting-list">Waiting List</TabsTrigger>
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="discharged">Discharged</TabsTrigger>
              {(role === "Admin" || role === "Super User") && (
                <TabsTrigger value="add-patient">Add Patient</TabsTrigger>
              )}
            </TabsList>

            <div className="mt-4">
              <TabsContent value="all-list">
                <Card>
                  <CardHeader>
                    <CardTitle>All Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AllPatientsList />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="total-waiting-list">
                <Card>
                  <CardHeader>
                    <CardTitle>Waiting List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WaitingList />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="procedures">
                <Card>
                  <CardHeader>
                    <CardTitle>Ongoing Procedures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DischargePatient />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="discharged">
                <Card>
                  <CardHeader>
                    <CardTitle>Discharged Patients</CardTitle>
                  </CardHeader>
                  <CardContent><DischargePatientsList /></CardContent>
                </Card>
              </TabsContent>
              {(role === "Admin" || role === "Super User") && (
                <TabsContent value="add-patient">
                  {/* <Card>
                    <CardHeader>
                      <CardTitle>Add New Patient</CardTitle>
                    </CardHeader>
                    <CardContent> */}
                  <AddPatient />
                  {/* </CardContent>
                  </Card> */}
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      <footer className="border-t bg-muted mt-auto">
        <div className="container flex h-16 items-center justify-center">
          <p className="text-sm text-muted-foreground">© 2025 NHS Healthcare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

