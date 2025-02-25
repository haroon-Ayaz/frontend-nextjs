"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ActivityIcon, FileTextIcon, UsersIcon, LayoutDashboardIcon } from "lucide-react"
import useCurrentUser from "@/hooks/useUser"
import { getStatistics, getClinicians, getPatients } from "@/app/api/actions"
import { useQuery } from "@tanstack/react-query"
import StatsCard from "@/app/dashboard-testing/components/StatsCard"
import AllPatientsList from "@/app/dashboard-testing/service/AllPatientsList"
import { SkeletonLoader } from "@/app/dashboard-testing/components/SkeletonLoader"
import Link from "next/link";
import { Users, Calendar, ClipboardCheck, Stethoscope, UserCheck, XCircle } from "lucide-react"
import DidNotAttendPatientList from "@/app/dashboard-testing/service/DidNotAttend"

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
            <h1 className="text-xl font-bold">My Endoscopy Tracker App</h1>
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

          </div>
        </div>

        <div className="relative z-30 pb-6">
          <Tabs defaultValue="all-list" className="space-y-6">
            <div className="border rounded-lg p-1 bg-white/50 backdrop-blur-sm shadow-sm">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-1">
                <TabsTrigger
                  value="all-waiting-list"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">All Waiting List</span>
                </TabsTrigger>

                <TabsTrigger
                  value="did-not-attend"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Did Not Attend</span>
                </TabsTrigger>

                <TabsTrigger
                  value="booked-procedures"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Booked Procedures</span>
                </TabsTrigger>

                <TabsTrigger
                  value="pre-assessment"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Pre-Assessment</span>
                </TabsTrigger>

                <TabsTrigger
                  value="ongoing-procedures"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <Stethoscope className="h-4 w-4" />
                  <span className="hidden sm:inline">Ongoing Procedures</span>
                </TabsTrigger>

                <TabsTrigger
                  value="dishcarged-patients"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200"
                >
                  <UserCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Discharged Patients</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Add your TabsContent components here */}
            <TabsContent value="all-waiting-list">
              <AllPatientsList />
            </TabsContent>

            <TabsContent value="did-not-attend">
              <DidNotAttendPatientList />
            </TabsContent>


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

