"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboardIcon } from "lucide-react"
import useCurrentUser from "@/hooks/useUser"
import { getClinicians, getPatients, getStats } from "@/app/api/actions"
import { useQuery } from "@tanstack/react-query"
import StatsCard from "@/app/dashboard-testing/components/StatsCard"
import AllPatientsList from "@/app/dashboard-testing/service/AllPatientsList"
import { SkeletonLoader } from "@/app/dashboard-testing/components/SkeletonLoader"
import {
  Users,
  Calendar,
  ClipboardCheck,
  Stethoscope,
  UserCheck,
  XCircle,
  ClipboardList,
  RefreshCw,
  Activity,
  AlertTriangle,
} from "lucide-react"
import DidNotAttendPatientList from "@/app/dashboard-testing/service/DidNotAttend"
import BookedForProcedure from "@/app/dashboard-testing/service/BookedProcedures"
import BookedForPreAssessment from "@/app/dashboard-testing/service/PreAssessment"
import WaitingList from "@/app/dashboard-testing/service/WaitingList"
import { Button } from "@/components/ui/button"
import { refreshDatabase } from "@/app/api/actions"
import { AlertComponent } from "@/app/dashboard-testing/components/AlertDialogBox"
import { useState } from "react"
import OngoingProcedures from "@/app/dashboard-testing/service/OngoingProcedures"
import DischargePatient from "@/app/dashboard-testing/service/clinician/DischargePatient"


export default function Dashboard() {
  const { role, email, fname, lname } = useCurrentUser()
  const [showAlert, setShowAlert] = useState(false)

  const {
    data: stats,
    isLoading: loadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStats,
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
      value: stats?.total_wl || 0,
      subtext: "Patients waiting",
      icon: ClipboardList,
    },
    {
      title: "Ongoing Procedures",
      value: stats?.total_ong_proce || 0,
      subtext: "Current procedures",
      icon: Activity,
    },
    {
      title: "Discharged Patients",
      value: stats?.total_discharged || 0,
      subtext: "Recently discharged",
      icon: UserCheck,
    },
    {
      title: "Booked for Procedure",
      value: stats?.total_bkd_proce || 0,
      subtext: "Patients booked for procedure",
      icon: Calendar,
    },
    {
      title: "Booked for Pre-Assessment",
      value: stats?.total_bkd_pre_asses || 0,
      subtext: "Patients booked for pre-assessment",
      icon: ClipboardCheck,
    },
    {
      title: "Cancellation or DNA",
      value: stats?.total_dna || 0,
      subtext: "Patients who cancelled or DNA",
      icon: AlertTriangle,
    },
  ]


  const handleRefreshDatabase = () => {
    console.log("Refreshing database...")
    refreshDatabase()
    setShowAlert(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        {showAlert && (
          <AlertComponent
            variant="success"
            title="Database Refreshed"
            description="The database has been successfully updated."
            duration={1500}
          />
        )}
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-4">
            <LayoutDashboardIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">My Endoscopy Tracker App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {fname}</span>
            <span className="text-sm font-semibold">{role}</span>
            <Button
              onClick={handleRefreshDatabase}
              variant="outline"
              size="sm"
              className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Database
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4">
        <div className="py-6 bg-background relative z-40">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsData.slice(0, 3).map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsData.slice(3).map((stat, index) => (
                <StatsCard key={index + 3} {...stat} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-30 pb-6">
          <Tabs defaultValue="all-list" className="space-y-6">
            <div className="border rounded-lg p-0 w-full mx-0 bg-white/50 backdrop-blur-sm shadow-sm overflow-x-auto">
              <TabsList className="flex w-full min-w-max h-auto gap-1">
                <TabsTrigger
                  value="all-list"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden lg:inline">All Waiting List</span>
                  <span className="lg:hidden">All</span>
                </TabsTrigger>

                <TabsTrigger
                  value="waiting-list"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden lg:inline">Waiting List</span>
                  <span className="lg:hidden">Waiting</span>
                </TabsTrigger>

                <TabsTrigger
                  value="did-not-attend"
                  className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="hidden lg:inline">Did Not Attend</span>
                  <span className="lg:hidden">DNA</span>
                </TabsTrigger>

                {role === "Admin" && (
                  <TabsTrigger
                    value="booked-procedures"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden lg:inline">Booked Procedures</span>
                    <span className="lg:hidden">Booked</span>
                  </TabsTrigger>
                )}


                <TabsTrigger
                  value="pre-assessment"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="hidden lg:inline">Pre-Assessment</span>
                  <span className="lg:hidden">Pre-Assess</span>
                </TabsTrigger>

                {role === "Clinician" && (
                  <TabsTrigger
                    value="ongoing-procedures"
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span className="hidden lg:inline">Ongoing Procedures</span>
                    <span className="lg:hidden">Ongoing</span>
                  </TabsTrigger>)}

                <TabsTrigger
                  value="discharged-patients"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex items-center gap-2 py-3 transition-all duration-200 whitespace-nowrap"
                >
                  <UserCheck className="h-4 w-4" />
                  <span className="hidden lg:inline">Discharged Patients</span>
                  <span className="lg:hidden">Discharged</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all-list">
              <AllPatientsList />
            </TabsContent>

            <TabsContent value="waiting-list">
              <WaitingList />
            </TabsContent>

            <TabsContent value="did-not-attend">
              <DidNotAttendPatientList />
            </TabsContent>

            <TabsContent value="booked-procedures">
              <BookedForProcedure />
            </TabsContent>

            <TabsContent value="pre-assessment">
              <BookedForPreAssessment />
            </TabsContent>

            <TabsContent value="ongoing-procedures">
              <OngoingProcedures />
            </TabsContent>

            <TabsContent value="discharged-patients">
              <DischargePatient />
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

