import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TableComponent from "@/app/dashboard/components/TableComponent";
import { useQuery } from "@tanstack/react-query";
import { getPatients, getClinicians } from "@/app/api/actions";
import useCurrentUser from "@/hooks/useUser";
import { TableActionsContext } from "@/context/TableActionsContext";

export default function WaitingList() {
    const { role, email, fname } = useCurrentUser();

    const {
        data: patientList,
        isLoading: loadingStats,
        error: errorStats,
    } = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients,
        refetchInterval: 2000,
    });

    const {
        data: clinicianList,
        isLoading: loadingClinicians,
        error: errorClinicians,
    } = useQuery({
        queryKey: ["patients"],
        queryFn: getClinicians,
        refetchInterval: 2000,
    });

    // Convert clinician objects to simple name strings
    const clinicians = clinicianList.map(c => `${c.fname} ${c.lname}`);

    // Function to assign a patient to a clinician
    const assignPatient = async (patientId, clinician) => {
        console.log("Assigning Patient", patientId);
        console.log("Clinician", clinician);
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/assignpatient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_id: patientId, assigned_to: clinician }),
            });
            if (response.ok) {
                console.log(`Patient ${patientId} assigned to ${clinician}`);
                alert("Patient Assigned Successfully");
            } else {
                console.error("Failed to assign patient.");
            }
        } catch (error) {
            console.error("Error assigning patient:", error);
        }
    };

    // Define the table columns for patient data
    const columns = [
        { id: "rxkid", label: "RXK ID" },
        { id: "title", label: "Title" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "address", label: "Address" },
        { id: "postcode", label: "Post Code" },
        { id: "phone_number", label: "Phone Number" },
        { id: "home_number", label: "Home Number" },
        { id: "problem", label: "Problem" }

    ];

    return (
        <TableActionsContext>
            <TableComponent
                columns={columns}
                data={patientList}
                role={role}
                clinicians={clinicians}
                onAssignPatient={assignPatient}
            />
        </TableActionsContext>
    );
}
