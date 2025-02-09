import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/app/api/actions";
import TableComponent from "@/app/dashboard/components/TableComponent";
import { PatientDetailsDialog } from "../components/PatientDetialsDialogBox";
import { Button } from "@/components/ui/button";
import { baseColumns } from "@/app/dashboard/utils/template";

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
        { id: "assignto", label: "Assign To" },
        { id: "status", label: "Status" }
    ]


    return (
        <TableComponent
            columns={allColumns}
            data={patientList}
        />
    );
}