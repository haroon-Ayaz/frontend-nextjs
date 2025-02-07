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

export function AssignPatientDialog({ patient, clinicians, onAssign }) {
    const [open, setOpen] = useState(false)
    const [selectedClinician, setSelectedClinician] = useState("")
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const sendSMS = async (recipientNumber, date) => {
        try {
            const response = await fetch('https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/send_sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipient_number: recipientNumber, date: date })
            });
            const text = await response.text();
            console.log('Raw response:', text);
            const result = JSON.parse(text);

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send SMS');
            }

            console.log('SMS sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    };

    const handleAssign = async () => {
        // Format the appointment date and time
        const formattedDateTime = `${format(appointmentDate, "dd/MM/yyyy")} at ${appointmentTime}`;
        const message = `SWBH Endoscopy Appointment Reminder: Hi ${patient.fname}, this is a reminder that you have a procedure booked for ${formattedDateTime}.\n\nPlease respond back with CANCEL if no longer needed.`;
        console.log(message);
        onAssign(patient.rxkid, selectedClinician, appointmentDate, appointmentTime, phoneNumber, message);
        setOpen(false);
        try {
            await sendSMS(phoneNumber, formattedDateTime);
        } catch (error) {
            console.error("Error sending SMS:", error);
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
                                    <Button variant={"outline"} className={`w-[280px] justify-start text-left font-normal col-span-3`}>
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
                        <Button onClick={handleAssign}>Confirm Assignment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

