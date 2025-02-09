import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TableComponent from "@/app/dashboard/components/TableComponent";
import { useQuery } from "@tanstack/react-query";
import { getPatients, getClinicians, getDischargedPatients } from "@/app/api/actions";
import useCurrentUser from "@/hooks/useUser";
import { TableActionsContext } from "@/context/TableActionsContext";
import { AssignPatientDialog } from "@/app/dashboard/components/AssignPatient";
import { SkeletonLoader } from "@/app/dashboard/components/SkeletonLoader";
import { baseColumns } from "@/app/dashboard/utils/template";

export default function DischargePatientsList() {
    const { role, email, fname } = useCurrentUser();

    const {
        data: patientList,
        isLoading: loadingStats,
        error: errorStats,
    } = useQuery({
        queryKey: ["patients"],
        queryFn: getDischargedPatients,
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
    // const waitingListColumns = [
    //     ...baseColumns,
    //     ...(role === "Admin" || role === "Super User" ? [{
    //         id: "assignto",
    //         label: "Assign To",
    //         render: (row, clinicians) => (
    //             <AssignPatientDialog patient={row} />
    //         )
    //     }] : [])
    // ];


    return (
        <TableComponent
            columns={baseColumns}
            data={patientList}
            role={role}
        />
    );
}
