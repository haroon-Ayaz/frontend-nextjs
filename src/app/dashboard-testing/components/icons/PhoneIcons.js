"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, parseISO } from "date-fns"
import { Phone, Clock, Calendar, MessageSquare, Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getPatientCallLogs } from "@/app/api/actions"

const ICON_SIZE = "h-4 w-4"

const CallLogItem = ({ log }) => (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg mb-4 transition-all duration-200 hover:bg-gray-100">
        <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-blue-600" />
            </div>
        </div>
        <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{format(parseISO(log.call_date), "MMM d, yyyy")}</span>
                <Clock className="h-4 w-4 text-gray-400 ml-2" />
                <span className="text-sm text-gray-600">{format(parseISO(`${log.call_date}T${log.call_time}`), "h:mm a")}</span>
            </div>
            <p className="text-sm text-gray-700">{log.admin_comment}</p>
        </div>
    </div>
)

export const PhoneIcon = ({ patient_rxkid, onCall }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [callDate, setCallDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [callTime, setCallTime] = useState(format(new Date(), "HH:mm"))
    const [adminComment, setAdminComment] = useState("")

    // In your PhoneIcon component, update the useQuery call:
    const { data: callLogs, isLoading, error } = useQuery({
        queryKey: ["patientCallLogs", patient_rxkid],
        queryFn: () => getPatientCallLogs({ patient_rxkid }),
        enabled: isOpen,
    });

    const handleSubmit = () => {
        // onCall({ patient_rxkid, call_date: callDate, call_time: callTime, admin_comment: adminComment })
        onCall(callDate, callTime, adminComment)
        setAdminComment("")
        setIsOpen(false)
    }

    return (
        <>
            <div className="inline-flex items-center justify-center w-8 h-8">
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-blue-100 transition-colors rounded-full"
                    onClick={() => setIsOpen(true)}
                >
                    <Phone className={`${ICON_SIZE} text-blue-600`} />
                </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            <Phone className="h-5 w-5 text-blue-600" />
                            Call Logs
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* New Call Log Form */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                                <Plus className="h-5 w-5 text-green-500" />
                                Log New Call
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <Input
                                        type="date"
                                        value={callDate}
                                        onChange={(e) => setCallDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <Input
                                        type="time"
                                        value={callTime}
                                        onChange={(e) => setCallTime(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                <Textarea
                                    value={adminComment}
                                    onChange={(e) => setAdminComment(e.target.value)}
                                    placeholder="Enter call details..."
                                    className="w-full"
                                />
                            </div>
                            <Button onClick={handleSubmit} className="w-full">
                                Log Call
                            </Button>
                        </div>

                        {/* Call History */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                Call History
                            </h3>
                            <ScrollArea className="h-[300px] rounded-md border">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    </div>
                                ) : error ? (
                                    <div className="text-red-500 p-4">Error loading call logs</div>
                                ) : callLogs && callLogs.length > 0 ? (
                                    callLogs.map((log) => <CallLogItem key={log.id} log={log} />)
                                ) : (
                                    <div className="text-gray-500 p-4 text-center">No call logs available</div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

