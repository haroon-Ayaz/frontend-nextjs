"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
            <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
                Discharge Patient
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Discharge Patient</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Patient Name</Label>
                            <div className="col-span-3 font-medium">{patientName}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Patient ID</Label>
                            <div className="col-span-3 font-medium">{patientId}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Admission Date</Label>
                            <div className="col-span-3 font-medium">{admissionDate}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Discharge?</Label>
                            <RadioGroup
                                className="col-span-3"
                                onValueChange={(value) => setDischargeConfirmed(value)}
                            >
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="remarks" className="text-right">
                                        Clinician Remarks
                                    </Label>
                                    <Textarea
                                        id="remarks"
                                        placeholder="Enter any additional remarks..."
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="medication" className="text-right">
                                        Medication Instructions
                                    </Label>
                                    <Textarea
                                        id="medication"
                                        placeholder="Enter medication instructions..."
                                        value={medicationInstructions}
                                        onChange={(e) => setMedicationInstructions(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleDischarge}
                            disabled={dischargeConfirmed !== "yes" || !remarks || !medicationInstructions}
                        >
                            Confirm Discharge
                        </Button>
                    </DialogFooter>
                    {dischargeSuccess && (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>Patient has been successfully discharged.</AlertDescription>
                        </Alert>
                    )}
                    {dischargeError && (
                        <Alert variant="destructive">
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

