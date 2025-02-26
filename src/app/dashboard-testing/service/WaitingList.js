import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomPatientDataSet } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";
import { TableSkeleton } from "@/app/dashboard-testing/components/DataTable/TableSkeleton";
import AssignClinicianComponent from "@/app/dashboard-testing/components/icons/AssignClinicial"

export default function WaitingList() {
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
        {
            id: "assignto",
            label: "Assign To",
            render: (row) => <AssignClinicianComponent patient={row} />
        },
    ]

    return (
        <TableComponent
            columns={allColumns}
            data={patientList}
        />
    );
}