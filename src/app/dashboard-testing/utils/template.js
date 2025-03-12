"use client"

import { Button } from "@/components/ui/button"
import { PatientDetailsDialog } from "@/app/dashboard-testing/components/PatientDetialsDialogBox"
import { useState } from "react"
import {
    CancerIcon,
    Over13WeeksIcon,
    ShortNoticeIcon,
} from "@/app/dashboard-testing/components/IconComponents"
import { PhoneIcon } from "@/app/dashboard-testing/components/icons/PhoneIcons"
import { CommentIcon } from "@/app/dashboard-testing/components/icons/CommentIcon"
import { SMSIcon } from "@/app/dashboard-testing/components/icons/SmsMssg"
import useCurrentUser from "@/hooks/useUser"

export const PatientDetailsButton = ({ patient }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Show Details
            </Button>
            {open && <PatientDetailsDialog patient={patient} onClose={() => setOpen(false)} />}
        </>
    )
}

const ActionsColumn = ({ row, onAddComment, onLogCall }) => {
    const { role } = useCurrentUser();

    return (
        <div className="inline-flex items-center space-x-1">
            <CancerIcon isBooked={row.isBooked} is2WeekWait={row.referral_priority === "2 Week Rule"} />
            <Over13WeeksIcon isBooked={row.isBooked} isOver13Weeks={row.sub_type === "13+ Weeks"} />
            <ShortNoticeIcon isShortNotice={row.short_notice_flag === "Y"} />
            {role === "Admin" && (
                <>
                    <CommentIcon comments={row.comment} onAddComment={(comment) => onAddComment(row.rxkid, comment)} />
                    <SMSIcon />
                    <PhoneIcon
                        patient_rxkid={row.rxkid}
                        onCall={(call_date, call_time, admin_comment) =>
                            onLogCall(row.rxkid, call_date, call_time, admin_comment)
                        }
                    />
                </>
            )}
        </div>
    );
};

export const baseColumns = [
    { id: "id", label: "ID" },
    {
        id: "actions",
        label: "Actions",
        render: (row, extraProps) => (
            <ActionsColumn
                row={row}
                onAddComment={extraProps.onAddComment}
                onLogCall={extraProps.onLogCall}
            />
        ),
        // render: (row, extraProps) => {
        //     return (
        //         <div className="inline-flex items-center space-x-1">
        //             <CancerIcon isBooked={row.isBooked} is2WeekWait={row.referral_priority === "2 Week Rule"} />
        //             <Over13WeeksIcon isBooked={row.isBooked} isOver13Weeks={row.sub_type === "13+ Weeks"} />
        //             <ShortNoticeIcon isShortNotice={row.short_notice_flag === "Y"} />

        //             <>
        //                 <CommentIcon comments={row.comment} onAddComment={(comment) => extraProps.onAddComment(row.rxkid, comment)} />
        //                 <SMSIcon />
        //                 <PhoneIcon patient_rxkid={row.rxkid} onCall={(call_date, call_time, admin_comment) =>
        //                     extraProps.onLogCall(row.rxkid, call_date, call_time, admin_comment)} />
        //             </>
        //         </div>
        //     )
        // },
    },
    { id: "forename", label: "First Name" },
    { id: "surname", label: "Last Name" },
    { id: "waitlist_name", label: "Waitlist Name" },
    { id: "key_code", label: "Key Code" },
    { id: "test_type", label: "Test Type" },
    { id: "test_type_main", label: "Test Type Main" },
    { id: "rxkid", label: "RXK ID" },
    { id: "reporting_status", label: "Reporting Status" },
    { id: "points", label: "Points" },
    { id: "requires_pre_add", label: "Requires Pre-Add" },
    { id: "comment", label: "Comment" },
    { id: "dated", label: "Dated" },
    { id: "sub_type", label: "Sub Type" },
    { id: "referral_priority", label: "Referral Priority" },
    { id: "date_added_to_wl", label: "Date Added to WL" },
    { id: "adj_wl_start", label: "Adj WL Start" },
    { id: "remvl_dttm", label: "REMVL DTTM" },
    { id: "weeks_wait", label: "Weeks Wait" },
    { id: "current_rtt_waits", label: "Current RTT Waits" },
    { id: "indication", label: "Indication" },
    { id: "appointment_date", label: "Appointment Date" },
    { id: "appt_by_date_ipm", label: "Appt By Date (IPM)" },
    { id: "appt_by_date_calculated", label: "Appt By Date (Calculated)" },
    { id: "short_notice_flag", label: "Short Notice Flag" },
    {
        id: "showDetails",
        label: "Show Details",
        render: (row) => <PatientDetailsButton patient={row} />,
    },
];


