"use client";

import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useRouter} from "next/navigation";

export default function DischargeList() {
    const router = useRouter();
    const [patientList, setPatientList] = React.useState([]);
    const [role, setRole] = React.useState([]);
    const [email, setEmail] = React.useState("");

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_discharged_patients");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    useEffect(() => {
        fetchPatients(); // Fetch initially
        const interval = setInterval(fetchPatients, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [])


    React.useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedEmail = localStorage.getItem("userEmail");

        setRole(storedRole || "");
        setEmail(storedEmail || "");

        if (!storedRole) {
            router.push("/auth/login");
        }
    }, [router]);

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
                            <TableHead>Status</TableHead>
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
                                <TableCell>{patient.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}