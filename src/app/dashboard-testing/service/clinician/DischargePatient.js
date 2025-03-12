// updates/utils/waitingList.js
import React, { useEffect, useState } from "react";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { SkeletonLoader } from "@/app/dashboard-testing/components/SkeletonLoader";
import { DischargePatientDialogBox } from "@/app/dashboard-testing/components/DischargePatientDialogBox";
import useCurrentUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getDischargedPatients, dischargePatients } from "@/app/api/actions";
import { baseColumns } from "@/app/dashboard-testing/utils/template";
import { ClinicianRemarksButton } from "@/app/dashboard-testing/components/ClinicianRemarksButton";

export default function DischargePatient() {
    const { role, email, fname } = useCurrentUser();

    const {
        data: dischargedPatientList,
        isLoading: loadingDischargedPatientsList,
        error: errorDischargedPatientsList
    } = useQuery({
        queryKey: ["discharged_patients"],
        queryFn: getDischargedPatients,
        refetchInterval: 2000
    })

    console.log("Retrieved Discharged Patients: ", dischargedPatientList)

    if (loadingDischargedPatientsList) {
        return <SkeletonLoader />
    }

    // Only add the "assignto" column if the role is "Admin" or "Super User"
    const columns = [
        ...baseColumns.slice(0, 2),  // Keep first two columns
        { id: "assigned_too", label: "Assigned To" }, // Insert "Assigned To" at 3rd position
        ...baseColumns.slice(2), // Append remaining columns
        {
            id: "clinicianRemarks",
            label: "Clinician Remarks",
            render: (row) => (
                <ClinicianRemarksButton
                    patientName={`${row.forename} ${row.surname}`}
                    clinicianName={row.assigned_too}
                    dischargeDate={row.date_added_to_wl}
                    dischargeNotes={row.discharge_notes}
                    recoveryNotes={row.recovery_instructions}
                />
            )
        }
    ];

    return (
        <TableComponent
            columns={columns}
            data={dischargedPatientList}
            role={role}
        />
    );
}
