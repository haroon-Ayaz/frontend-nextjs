import React, {useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useRouter} from "next/navigation";

export default function WaitingList() {
    const [role, setRole] = React.useState("");
    const [email, setEmail] = React.useState("");
    const router = useRouter();
    const [patientList, setPatientList] = React.useState([]);
    const [clinicianList, setClinician] = React.useState([]);

    const fetchPatients = async () => {
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/get_waiting_patients");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    const fetchClinicians = async () => {
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/get_clinicians");
            const data = await response.json();
            setClinician(data["clinicians"]);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    useEffect(() => {
        fetchClinicians(); // Fetch initially
        const interval = setInterval(fetchClinicians, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [])


    const simplifiedList = clinicianList.map(clinician => `${clinician.fname} ${clinician.lname}`);

    const clinicians = simplifiedList


    const assignPatient = async (patientId, clinician) => {
        console.log("Assigning Patient", patientId);
        console.log("Clinician ", clinician);
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/assignpatient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ patient_id: patientId, assigned_to: clinician }),
            });
            if (response.ok) {
                console.log(`Patient ${patientId} assigned to ${clinician}`);
                alert("Patient Assigned Successfully")
            } else {
                console.error("Failed to assign patient.");
            }
        } catch (error) {
            console.error("Error assigning patient:", error);
        }
    };

    React.useEffect(() => {
        fetchPatients(); // Fetch initially
        const interval = setInterval(fetchPatients, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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
                            {role === "Admin" && (
                                <TableHead>Assign To</TableHead>
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
                                    {(role === "Admin" || role === "Super User") && (
                                    <TableCell>
                                            <Select onValueChange={(value) => assignPatient(patient.rxkid, value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Assign clinician" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {clinicians.map((c) => (
                                                        <SelectItem key={c} value={c}>
                                                            {c}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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