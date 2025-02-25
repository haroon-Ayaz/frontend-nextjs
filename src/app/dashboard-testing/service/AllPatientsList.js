import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";

export default function AllPatientsList() {
    const {
        data: patientList,
        isLoading: loadingStats,
        error: errorStats,
    } = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients,
        refetchInterval: 2000,
    });

    const allColumns = [
        ...baseColumns,
        // { id: "assignto", label: "Assign To" },
    ]

    return (
        <TableComponent
            columns={allColumns}
            data={patientList}
        />
    );
}