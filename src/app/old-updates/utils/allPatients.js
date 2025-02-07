"use client";

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import TableComponent from "@/app/old-updates/componenets/old_tableComponent";

export default function AllList() {
    const [patientList, setPatientList] = React.useState([]);

    // Fetch patients from the API
    const fetchPatients = async () => {
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/getdata");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    React.useEffect(() => {
        fetchPatients();
        const interval = setInterval(fetchPatients, 2000);
        return () => clearInterval(interval);
    }, []);

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

    // Function to determine row CSS class based on patient status
    const getRowClass = (patient) => {
        if (patient.status === "Waiting") return "bg-green-100";
        if (patient.status === "Procedure") return "bg-yellow-100";
        if (patient.status === "Discharged") return "bg-red-100";
        return "";
    };

    return (
        <TableComponent
            columns={columns}
            data={patientList}
            getRowClass={getRowClass}
        />
    );
}
