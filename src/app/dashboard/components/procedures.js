"use client";

import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";

export default function ProcedureList() {
    const clinicians = ["Dr. Johnson", "Dr. Williams", "Dr. Davis"]
    const [role, setRole] = React.useState("");
    const [patientList, setPatientList] = React.useState([]);
    const router = useRouter();
    const [email, setEmail] = React.useState("");

    const fetchPatients = React.useCallback(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_procedure_patients");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
        const interval = setInterval(fetchPatients, 2000);
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole || "");
        return () => clearInterval(interval);
    }, [fetchPatients]);

    if (!role && patientList.length === 0) return <p>Loading...</p>;

    //
    // useEffect(() => {
    //     const storedRole = localStorage.getItem("userRole");
    //     const storedEmail = localStorage.getItem("userEmail");
    //
    //     setRole(storedRole || "");
    //     setEmail(storedEmail || "");
    //
    //     if (!storedRole) {
    //         router.push("/auth/login");
    //     }
    // }, [router]);

    const handleCheck = async (rxkid) => {
        console.log(`Checked patient: ${rxkid}`);
        // Add API call or logic here
        try {
            const response = await fetch("http://127.0.0.1:5000/api/discharge_patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({patient_id: rxkid}),
            });
            if (response.ok) {
                alert("Patient Discharged Successfully")
            } else {
                console.error("Failed to assign patient.");
            }
        } catch (error) {
            console.error("Error assigning patient:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Waiting List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>RXK ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Post Code</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Home Number</TableHead>
                            <TableHead>Problem</TableHead>
                            <TableHead>Assign To</TableHead>
                            {(role === "Clinician" || role === "Super User") && (
                                <TableHead>Discharge The Patient</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientList.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.rxkid}</TableCell>
                                <TableCell>{patient.title}</TableCell>
                                <TableCell>{patient.fname}</TableCell>
                                <TableCell>{patient.lname}</TableCell>
                                <TableCell>{patient.address}</TableCell>
                                <TableCell>{patient.postcode}</TableCell>
                                <TableCell>{patient.phone_number}</TableCell>
                                <TableCell>{patient.home_number}</TableCell>
                                <TableCell>{patient.problem}</TableCell>
                                <TableCell>{patient.assigned_to}</TableCell>
                                {(role === "Clinician" || role === "Super User") && (
                                    <TableCell>
                                        <button onClick={() => handleCheck(patient.rxkid)}>
                                            <Checkbox className="w-5 h-5 text-green-600 hover:text-green-800"/>
                                        </button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}