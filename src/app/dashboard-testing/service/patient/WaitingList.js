import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TableComponent from "@/app/dashboard-testing/components/TableComponent";
import { useQuery } from "@tanstack/react-query";
import { getPatients, getClinicians } from "@/app/api/actions";
import useCurrentUser from "@/hooks/useUser";
import { TableActionsContext } from "@/context/TableActionsContext";
import { AssignPatientDialog } from "@/app/dashboard-testing/components/AssignPatient";
import { SkeletonLoader } from "@/app/dashboard-testing/components/SkeletonLoader";
import { baseColumns } from "@/app/dashboard-testing/utils/template";

export default function WaitingList() {
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

    // const baseColumns = [
    //     { id: "rxkid", label: "RXK ID" },
    //     { id: "title", label: "Title" },
    //     { id: "fname", label: "First Name" },
    //     { id: "lname", label: "Last Name" },
    //     { id: "address", label: "Address" },
    //     { id: "postcode", label: "Post Code" },
    //     { id: "phone_number", label: "Phone Number" },
    //     { id: "home_number", label: "Home Number" },
    //     { id: "problem", label: "Problem" }
    // ];

    // Only add the "assignto" column if the role is "Admin" or "Super User"
    const waitingListColumns = [
        ...baseColumns,
        ...(role === "Admin" || role === "Super User" ? [{
            id: "assignto",
            label: "Assign To",
            render: (row, clinicians) => (
                <AssignPatientDialog patient={row} />
            )
        }] : [])
    ];


    return (
        <TableComponent
            columns={waitingListColumns}
            data={patientList}
            role={role}
        />
    );
}
