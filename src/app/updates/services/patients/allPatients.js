"use client";

import { useMutation } from "@tanstack/react-query";
import { getPatientData } from "@/app/updates/api/actions";
import { useEffect, useState } from "react";
import TableComponent from "@/app/updates/componenets/tableComponent";

export default function AllList() {
    const [patientList, setPatientData] = useState(null);

    const {
        data,
        mutate: server_getPatientData,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: getPatientData,
        onSuccess: (data) => {
            console.log("Data successfully fetched:", data);
            setPatientData(data);
        },
        onError: (error) => {
            console.error("Failed to fetch data:", error);
        },
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("Attempting to fetch patients data")
            server_getPatientData();
        }, 2000); // Trigger every 2 seconds

        return () => clearInterval(intervalId); // Clean up on unmount
    }, [server_getPatientData]);

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error?.message || "An error occurred"}</p>;
    }

//    useEffect(() => {
//        const intervalId = setInterval(() => {
//            console.log("Attempting to fetch patients data")
//            server_getPatientData();
//        }, 2000); // Trigger every 2 seconds
//
//        return () => clearInterval(intervalId); // Clean up on unmount
//    }, [server_getPatientData]);
//
//    if (isPending) {
//        return <p>Loading...</p>;
//    }
//
//    if (isError) {
//        return <p>Error: {error?.message || "An error occurred"}</p>;
//    }

// //    const [data, setData] = React.useState(null);
//    const fetchPatientsData = async () => {
//        const response = await fetchData("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/getdata")
//        setData(response);
//    }
//    React.useEffect(() => {
//        fetchPatientsData();
//        const interval = setInterval(fetchPatientsData, 2000);
//        return () => clearInterval(interval);
//    }, []);
//    console.log(data)

//    console.log(patientList)
//
//    if (isLoading) return <div>Loading...</div>;
//    if (error) return <div>Error loading patients.</div>;

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

    // Function to determine row CSS class based on patient status
    const getRowClass = (patient) => {
        if (patient.status === "Waiting") return "bg-green-100";
        if (patient.status === "Procedure") return "bg-yellow-100";
        if (patient.status === "Discharged") return "bg-red-100";
        return "";
    };

    return (<></>
//        <TableComponent
//            columns={columns}
//            data={patientList}
//            getRowClass={getRowClass}
//        />
    );
}
