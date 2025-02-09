import { Button } from "@/components/ui/button";
import { PatientDetailsDialog } from "@/app/dashboard/components/PatientDetialsDialogBox";
import { useState } from "react";

export const PatientDetailsButton = ({ patient }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Show Details
            </Button>
            {open && (
                <PatientDetailsDialog
                    patient={patient}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export const baseColumns = [
    { id: "serialNumber", label: "Serial Number" },
    { id: "rxkid", label: "RXK ID" },
    {
        id: "showDetails",
        label: "Show Details",
        render: (row) => <PatientDetailsButton patient={row} />,
    },
    { id: "title", label: "Title" },
    { id: "fname", label: "First Name" },
    { id: "lname", label: "Last Name" },
    { id: "address", label: "Address" },
    { id: "postcode", label: "Post Code" },
    { id: "phone_number", label: "Phone Number" },
    { id: "home_number", label: "Home Number" },
    { id: "problem", label: "Problem" }
];
