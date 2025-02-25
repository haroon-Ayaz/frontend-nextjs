import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/app/api/actions";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { baseColumns } from "@/app/dashboard-testing/utils/template";

export default function DidNotAttendPatientList() {
    // Wherever you're calling the query, modify it as follows:
    const {
        data: patientList,
        isLoading: loadingStats,
        error: errorStats,
    } = useQuery({
        queryKey: ["customPatients", "1 - Booked for procedure"],
        queryFn: () => getCustomPatientDataSet({ key_code }),
        refetchInterval: 2000,
    });

    console.log("DidNotAttend Patient List: ", patientList)

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