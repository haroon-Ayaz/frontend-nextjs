"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, parseISO } from "date-fns"
import {
    User,
    Calendar,
    Activity,
    FileText,
    Clock,
    AlertCircle,
    ClipboardList,
    MessageSquare,
    CheckCircle,
    XCircle,
    CalendarIcon,
    Hospital,
    Tag,
    Info,
} from "lucide-react"

const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A"
    try {
        return format(parseISO(dateString), "dd MMM yyyy HH:mm")
    } catch {
        return dateString
    }
}

const Section = ({ icon: Icon, title, children, color = "blue" }) => (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 text-${color}-600`}>
            <Icon className={`w-5 h-5 text-${color}-500`} />
            {title}
        </h3>
        <div className="space-y-4">{children}</div>
    </div>
)

const Field = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`group transition-all duration-200 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </div>
        <div className="ml-6">
            {value === "N/A" ? (
                <span className="text-gray-400 italic">Not Available</span>
            ) : (
                <span className="font-medium">{value}</span>
            )}
        </div>
    </div>
)

const Comment = ({ date, author, content }) => (
    <div className="border-l-2 border-blue-200 pl-4 py-2 hover:border-blue-400 transition-colors">
        <div className="flex items-center gap-2 mb-1">
            <time className="text-sm text-gray-500">{format(parseISO(date), "dd MMM yyyy HH:mm")}</time>
            <span className="text-sm font-medium text-blue-600">{author}</span>
        </div>
        <p className="text-gray-700">{content}</p>
    </div>
)

export function PatientDetailsDialog({ patient, onClose }) {
    const comments =
        patient.comment
            ?.split("\n")
            .map((comment) => {
                const match = comment.match(/\[(.*?)\] \[(.*?)\] (.*)/)
                return match ? { date: match[1], author: match[2], content: match[3] } : null
            })
            .filter(Boolean) || []

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-500" />
                        {patient.forename} {patient.surname}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-full pr-4 -mr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        {/* Personal & Medical Information */}
                        <div className="space-y-6">
                            <Section icon={User} title="Personal Information" color="blue">
                                <Field icon={FileText} label="ID" value={patient.id} />
                                <Field icon={FileText} label="RXK ID" value={patient.rxkid} />
                                <Field icon={Hospital} label="Waitlist Name" value={patient.waitlist_name} />
                                <Field icon={Activity} label="Test Type" value={patient.test_type} />
                                <Field icon={Activity} label="Test Type Main" value={patient.test_type_main} />
                            </Section>

                            <Section icon={Activity} title="Medical Status" color="rose">
                                <Field icon={AlertCircle} label="Reporting Status" value={patient.reporting_status} />
                                <Field icon={AlertCircle} label="Referral Priority" value={patient.referral_priority} />
                                <Field icon={Info} label="Indication" value={patient.indication} />
                                <Field icon={Activity} label="Current RTT Waits" value={patient.current_rtt_waits || "N/A"} />
                            </Section>
                        </div>

                        {/* Appointments & Timeline */}
                        <div className="space-y-6">
                            <Section icon={Calendar} title="Appointment Timeline" color="emerald">
                                <Field
                                    icon={CalendarIcon}
                                    label="Appointment Date"
                                    value={formatDate(patient.appointment_date)}
                                    className="bg-emerald-50/50 p-3 rounded-md"
                                />
                                <Field icon={CalendarIcon} label="Date Added to WL" value={formatDate(patient.date_added_to_wl)} />
                                <Field icon={CalendarIcon} label="Adj WL Start" value={formatDate(patient.adj_wl_start)} />
                                <Field icon={Clock} label="Weeks Wait" value={`${patient.weeks_wait} weeks`} />
                                <Field icon={CalendarIcon} label="Appt By Date (IPM)" value={formatDate(patient.appt_by_date_ipm)} />
                                <Field
                                    icon={CalendarIcon}
                                    label="Appt By Date (Calculated)"
                                    value={formatDate(patient.appt_by_date_calculated)}
                                />
                            </Section>

                            <Section icon={ClipboardList} title="Additional Details" color="violet">
                                <Field
                                    icon={CheckCircle}
                                    label="Short Notice"
                                    value={patient.short_notice_flag === "Y" ? "Yes" : "No"}
                                />
                                <Field icon={Tag} label="Sub Type" value={patient.sub_type} />
                                <Field icon={Tag} label="Key Code" value={patient.key_code} />
                                <Field icon={Info} label="Points" value={patient.points} />
                                <Field icon={CheckCircle} label="Requires Pre-Add" value={patient.requires_pre_add} />
                                <Field icon={XCircle} label="Dated" value={patient.dated} />
                                <Field icon={Clock} label="REMVL DTTM" value={patient.remvl_dttm} />
                            </Section>
                        </div>
                    </div>

                    {/* Comments Section - Full Width */}
                    {comments.length > 0 && (
                        <Section icon={MessageSquare} title="Comments History" color="amber">
                            <div className="space-y-4">
                                {comments.map((comment, index) => (
                                    <Comment key={index} {...comment} />
                                ))}
                            </div>
                        </Section>
                    )}
                </ScrollArea>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

