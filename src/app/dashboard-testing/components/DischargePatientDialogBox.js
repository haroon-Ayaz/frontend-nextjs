"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle2, UserRound, Calendar, ClipboardList, Pill } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function DischargePatientDialogBox({ patientName, patientId, admissionDate, onDischarge }) {
    const [isOpen, setIsOpen] = useState(false)
    const [dischargeConfirmed, setDischargeConfirmed] = useState(null)
    const [remarks, setRemarks] = useState("")
    const [medicationInstructions, setMedicationInstructions] = useState("")
    const [dischargeSuccess, setDischargeSuccess] = useState(false)
    const [dischargeError, setDischargeError] = useState("")

    const handleDischarge = async () => {
        if (dischargeConfirmed === "yes") {
            try {
                await onDischarge(patientId, remarks, medicationInstructions)
                setDischargeSuccess(true)
                setDischargeError("")
                setTimeout(() => setIsOpen(false), 2000) // Close dialog after 2 seconds
            } catch (error) {
                setDischargeError("Failed to discharge patient. Please try again.")
                setDischargeSuccess(false)
            }
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="outline" size="sm" className="flex items-center gap-2">
                <UserRound size={16} />
                Discharge Patient
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <UserRound size={24} />
                            Discharge Patient
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] overflow-y-auto pr-4">
                        <div className="space-y-6">
                            <div className="grid gap-4">
                                <div className="flex items-center gap-2">
                                    <UserRound size={18} className="text-muted-foreground" />
                                    <Label className="text-muted-foreground">Patient Name</Label>
                                    <div className="font-medium">{patientName}</div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-2">
                                    <ClipboardList size={18} className="text-muted-foreground" />
                                    <Label className="text-muted-foreground">Patient ID</Label>
                                    <div className="font-medium">{patientId}</div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-muted-foreground" />
                                    <Label className="text-muted-foreground">Admission Date</Label>
                                    <div className="font-medium">{admissionDate}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-lg font-semibold">Confirm Discharge</Label>
                                <RadioGroup onValueChange={(value) => setDischargeConfirmed(value)} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes" />
                                        <Label htmlFor="yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no" />
                                        <Label htmlFor="no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {dischargeConfirmed === "yes" && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="remarks" className="text-lg font-semibold flex items-center gap-2">
                                            <ClipboardList size={18} />
                                            Clinician Remarks
                                        </Label>
                                        <Textarea
                                            id="remarks"
                                            placeholder="Enter any additional remarks..."
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="medication" className="text-lg font-semibold flex items-center gap-2">
                                            <Pill size={18} />
                                            Medication Instructions
                                        </Label>
                                        <Textarea
                                            id="medication"
                                            placeholder="Enter medication instructions..."
                                            value={medicationInstructions}
                                            onChange={(e) => setMedicationInstructions(e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </ScrollArea>
                    <DialogFooter className="mt-6">
                        <Button
                            onClick={handleDischarge}
                            disabled={dischargeConfirmed !== "yes" || !remarks || !medicationInstructions}
                            className="w-full sm:w-auto"
                        >
                            Confirm Discharge
                        </Button>
                    </DialogFooter>
                    {dischargeSuccess && (
                        <Alert className="mt-4">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Patient has been successfully discharged.</AlertDescription>
                        </Alert>
                    )}
                    {dischargeError && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{dischargeError}</AlertDescription>
                        </Alert>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}