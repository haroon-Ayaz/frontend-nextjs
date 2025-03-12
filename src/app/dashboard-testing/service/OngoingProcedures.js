import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomPatientDataSet, getOnGoingProcedurePatients } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";
import { TableSkeleton } from "@/app/dashboard-testing/components/DataTable/TableSkeleton";
import useCurrentUser from "@/hooks/useUser"
import { DischargePatientDialogBox } from "@/app/dashboard-testing/components/DischargePatientDialogBox";


export default function OngoingProcedures() {
    const { role, email, fname, lname } = useCurrentUser()

    // console.log("Current Role is", role, "and full name is:", fname, lname)

    const fullName = fname + " " + lname

    const {
        data: ongoingProcedure,
        isLoading: loadingOnGoingProcedure,
        error: errorOnGoingProcedure,
    } = useQuery({
        queryKey: ["ongoingProcedures", fullName, role],
        queryFn: () => getOnGoingProcedurePatients({ fullName, role }),
        refetchInterval: 2000,
        enabled: !!fullName && !!role, // Ensures query runs only when both are available
    });

    if (!ongoingProcedure) {
        <TableSkeleton />
    }

    const columns = [
        ...baseColumns,
        ...(role === "Clinician" || role === "Super User" ? [{
            id: "dischargePatient",
            label: "Discharge Patient",
            render: (row, clinicians) => (
                <DischargePatientDialogBox
                    patientName={`${row.fname} ${row.lname}`}
                    patientId={row.rxkid}
                    admissionDate={row.admissionDate}
                />
            )
        }] : [])
    ];

    return (
        <TableComponent
            columns={columns}
            data={ongoingProcedure?.patients || []}
        />
    );
}