// updates/utils/waitingList.js
import React, { useEffect, useState } from "react";
import TableComponent from "@/app/dashboard/components/TableComponent";
import { SkeletonLoader } from "@/app/dashboard/components/SkeletonLoader";
import { DischargePatientDialogBox } from "@/app/dashboard/components/DischargePatientDialogBox";
import useCurrentUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getPatients, getClinicians } from "@/app/api/actions";
import { baseColumns } from "@/app/dashboard/utils/template";

export default function DischargePatient() {
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

    if (loadingStats || loadingClinicians) {
        return <SkeletonLoader />
    }

    // Define the dischargePatient function
    const dischargePatient = (patientId, remarks, medicationInstructions) => {
        // Implement the logic to discharge a patient
        console.log(`Discharging patient ${patientId} with remarks: ${remarks} and medication instructions: ${medicationInstructions}`);
        // You might want to call an API or update the state here
    };

    // Only add the "assignto" column if the role is "Admin" or "Super User"
    const columns = [
        ...baseColumns,
        ...(role === "Admin" || role === "Super User" ? [{
            id: "dischargePatient",
            label: "Discharge Patient",
            render: (row, clinicians) => (
                <DischargePatientDialogBox
                    patientName={`${row.fname} ${row.lname}`}
                    patientId={row.rxkid}
                    admissionDate={row.admissionDate}
                    onDischarge={dischargePatient}
                />
            )
        }] : [])
    ];

    return (
        <TableComponent
            columns={columns}
            data={patientList}
            role={role}
        />
    );
}
