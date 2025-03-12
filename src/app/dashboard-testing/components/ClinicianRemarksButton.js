"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, parseISO } from "date-fns"
import {
    FileText,
    Calendar,
    ClipboardCheck,
    User,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    Stethoscope,
} from "lucide-react"

export function ClinicianRemarksButton({
    patientName,
    clinicianName,
    dischargeDate,
    dischargeNotes,
    recoveryNotes,
}) {
    const [isOpen, setIsOpen] = useState(false)

    const formattedDate = dischargeDate ? format(parseISO(dischargeDate), "dd MMMM yyyy") : "N/A"

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center gap-2 rounded-lg px-4 py-2 shadow-sm"
            >
                <FileText className="h-4 w-4" />
                <span>Clinician Remarks</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white border-0 rounded-xl shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            Clinician Remarks
                        </DialogTitle>
                    </DialogHeader>

                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-blue-700">
                                <User className="h-4 w-4" />
                                <span className="font-medium">{patientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <span>Discharged by: </span>
                            <span className="font-medium text-blue-700">{clinicianName}</span>
                        </div>
                    </div>

                    <ScrollArea className="max-h-[400px] pr-4 -mr-4">
                        <div className="space-y-6">
                            {/* Discharge Notes Section */}
                            <div className="space-y-2">
                                <h3 className="text-md font-medium flex items-center gap-2 text-gray-900">
                                    <ClipboardCheck className="h-4 w-4 text-blue-600" />
                                    Discharge Notes
                                </h3>
                                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-700 whitespace-pre-line">{dischargeNotes}</p>
                                </div>
                            </div>

                            {/* Recovery Notes Section */}
                            <div className="space-y-2">
                                <h3 className="text-md font-medium flex items-center gap-2 text-gray-900">
                                    <MessageCircle className="h-4 w-4 text-blue-600" />
                                    Recovery Notes
                                </h3>
                                <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                                    <p className="text-gray-700 whitespace-pre-line">{recoveryNotes}</p>
                                </div>
                            </div>

                            {/* Recovery Status Indicators */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <h3 className="text-sm font-medium mb-3 text-gray-900">Recovery Status</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span className="text-xs">Medication Complete</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span className="text-xs">Follow-up Scheduled</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-100">
                                        <ArrowRight className="h-4 w-4 text-blue-500" />
                                        <span className="text-xs">Recovery In Progress</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        <Button onClick={() => setIsOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

