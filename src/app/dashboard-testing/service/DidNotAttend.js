import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomPatientDataSet } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";
import { TableSkeleton } from "@/app/dashboard-testing/components/DataTable/TableSkeleton";

export default function DidNotAttendPatientList() {
    // Wherever you're calling the query, modify it as follows:
    const key_code = "0 - Cancellation or DNA";

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
    ]

    return (
        <TableComponent
            columns={allColumns}
            data={patientList}
        />
    );
}