"use client";

import TableComponent from "@/app/updates/componenets/tableComponent";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";
import React from 'react';

export default function ProcedureList() {
    const [role, setRole] = React.useState("");
    const [patientList, setPatientList] = React.useState([]);
    const router = useRouter();

    // Fetch procedure patients from the API
    const fetchPatients = React.useCallback(async () => {
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/get_procedure_patients");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }, []);

    React.useEffect(() => {
        fetchPatients();
        const interval = setInterval(fetchPatients, 2000);
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole || "");
        return () => clearInterval(interval);
    }, [fetchPatients]);

    if (!role && patientList.length === 0) return <p>Loading...</p>;

    // Function to discharge a patient
    const handleDischarge = async (rxkid) => {
        console.log(`Discharging patient: ${rxkid}`);
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/discharge_patient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_id: rxkid }),
            });
            if (response.ok) {
                alert("Patient Discharged Successfully");
            } else {
                console.error("Failed to discharge patient.");
            }
        } catch (error) {
            console.error("Error discharging patient:", error);
        }
    };

    // Define the columns to be rendered by TableComponent
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
        { id: "assigned_to", label: "Assign To" }
    ];

    // Conditionally define an extra header cell if the user is a Clinician or Super User.
    const extraHeader = (role === "Clinician" || role === "Super User") ? (
        <th>Discharge The Patient</th>
    ) : null;

    // For each row, if the role permits, render an extra cell with a discharge button.
    const extraCell = (row) => {
        if (role === "Clinician" || role === "Super User") {
            return (
                <td>
                    <button onClick={() => handleDischarge(row.rxkid)}>
                        <Checkbox className="w-5 h-5 text-green-600 hover:text-green-800" />
                    </button>
                </td>
            );
        }
        return null;
    };

    return (
            <TableComponent
                columns={columns}
                data={patientList}
                extraHeader={extraHeader}
                extraCell={extraCell}
            />
    );
}
