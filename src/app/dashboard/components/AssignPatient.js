import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query";
import { getClinicians } from "@/app/api/actions";
import { handlePatientAssignment } from "@/app/api/actions";

import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// This is your AlertDemo component, which we’ll show on success.
export function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Assignment Successful!</AlertTitle>
      <AlertDescription>
        The patient has been assigned and an SMS has been sent.
      </AlertDescription>
    </Alert>
  )
}

export function AssignPatientDialog({ patient }) {
  const [open, setOpen] = useState(false)
  const [selectedClinician, setSelectedClinician] = useState("")
  const [appointmentDate, setAppointmentDate] = useState(new Date())
  const [appointmentTime, setAppointmentTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [assignmentSuccess, setAssignmentSuccess] = useState(false)
  const [assignmentError, setAssignmentError] = useState("")


  // Fetch clinicians if not provided via props
  const { data: clinicianList, isLoading: loadingClinicians, error: errorClinicians } = useQuery({
    queryKey: ["clinicians"],
    queryFn: getClinicians,
    refetchInterval: 2000,
  });

  // Convert clinician objects to simple name strings
  const cliList = clinicianList?.clinicians?.map(c => `${c.fname} ${c.lname}`) || [];

  // New async function to handle the assignment click
  const handleAssignmentClick = async () => {
    // Validate required fields
    if (!selectedClinician || !appointmentTime || !phoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }
    // Extract a primitive patient_id (assuming patient.rxkid or patient.id exists)
    const patient_id = patient.rxkid || patient.id;
    if (!patient_id) {
      console.error("Patient ID not found.");
      return;
    }
    // Format the appointment date and time
    const formattedDateTime = `${format(appointmentDate, "dd/MM/yyyy")} at ${appointmentTime}`;
    try {
      // Call the server action with primitive values only
      const result = await handlePatientAssignment({
        patient_id,
        assigned_to: selectedClinician,
        recipient_number: phoneNumber,
        appointment_date: formattedDateTime
      });
      console.log("Assignment successful", result);
      setAssignmentSuccess(true)
      setOpen(false);
    } catch (error) {
      console.error("Assignment error", error);
      alert("There was an error assigning the patient.");
      setAssignmentError(error.message || "There was an error assigning the patient.")
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Assign
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Patient to Clinician</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clinician" className="text-right">
                Clinician
              </Label>
              <Select onValueChange={setSelectedClinician} value={selectedClinician}>
                <SelectTrigger className="w-[180px] col-span-3">
                  <SelectValue placeholder="Select clinician" />
                </SelectTrigger>
                <SelectContent>
                  {cliList.map((c) => (
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
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal col-span-3">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={appointmentDate} onSelect={setAppointmentDate} initialFocus />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="col-span-3"
                placeholder="Enter patient's phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAssignmentClick}>Confirm Assignment</Button>
          </DialogFooter>
          {/* Show success or error alert below the dialog content */}
          {assignmentSuccess && <AlertDemo />}
          {assignmentError && (
            <Alert variant="destructive">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{assignmentError}</AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
