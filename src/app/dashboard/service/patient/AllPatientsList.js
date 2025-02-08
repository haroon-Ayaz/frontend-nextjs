import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/app/api/actions";
import TableComponent from "@/app/dashboard/components/TableComponent";

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

    // Define the columns for the table
    const columns = [
        { id: "rxkid", label: "RXK ID" },
        { id: "title", label: "Title" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "address", label: "Address" },
        { id: "postcode", label: "Post Code" },
        { id: "phone_number", label: "Phone Number" },
        { id: "home_number", label: "Home Number" },
        { id: "problem", label: "Problem" },
        { id: "assignto", label: "Assign To" },
        { id: "status", label: "Status" },
    ];

    return (
        <TableComponent
            columns={columns}
            data={patientList}
        />
    );
}