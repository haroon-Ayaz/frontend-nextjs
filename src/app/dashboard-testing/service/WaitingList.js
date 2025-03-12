import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomPatientDataSet } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";
import { TableSkeleton } from "@/app/dashboard-testing/components/DataTable/TableSkeleton";
import AssignClinicianComponent from "@/app/dashboard-testing/components/icons/AssignClinicial"
import { handlePatientAssignment } from "@/app/api/actions";
import useCurrentUser from "@/hooks/useUser"

function onAssignFunc(selectedClinician, patientID) {
    const fullName = selectedClinician.name.replace(/^Dr\.?\s*/, '');
    console.log("Selected Clinician Full Name: ", fullName, " Patient ID: ", patientID)
    handlePatientAssignment({ patient_id: patientID, assigned_to: fullName });
}


export default function WaitingList() {
    const { role, email, fname, lname } = useCurrentUser()

    console.log("Role Retrieved Is: ", role)

    // Wherever you're calling the query, modify it as follows:
    const key_code = "N/A";

    const {
        data: patientList,
        isLoading: loadingStats,
        error: errorStats,
    } = useQuery({
        queryKey: ["customPatients", key_code],
        queryFn: () => getCustomPatientDataSet({ key_code }),
        refetchInterval: 2000,
    });

    if (!patientList) {
        <TableSkeleton />
    }

    const allColumns = [
        ...baseColumns,
        ...(role === "Admin" ? [{
            id: "assignto",
            label: "Assign To",
            render: (row) => <AssignClinicianComponent patient={row} onAssign={onAssignFunc} />
        }] : [])
    ]


    return (
        <TableComponent
            columns={allColumns}
            data={patientList}
        />
    );
}