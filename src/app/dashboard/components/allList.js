import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AllList() {

    // Mock data
    const clinicians = ["Dr. Johnson", "Dr. Williams", "Dr. Davis"]

    const [patientList, setPatientList] = React.useState([]);

    const fetchPatients = async () => {
        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/getdata");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    React.useEffect(() => {
        fetchPatients(); // Fetch initially
        const interval = setInterval(fetchPatients, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientList.map((patient) => (
                            <TableRow key={patient.id} className={
                                patient.status === "Waiting" ? "bg-green-100" :
                                patient.status === "Procedure" ? "bg-yellow-100" :
                                patient.status === "Discharged" ? "bg-red-100" : ""
                            }>
                                <TableCell>{patient.rxkid}</TableCell>
                                <TableCell>{patient.title}</TableCell>
                                <TableCell>{patient.fname}</TableCell>
                                <TableCell>{patient.lname}</TableCell>
                                <TableCell>{patient.address}</TableCell>
                                <TableCell>{patient.postcode}</TableCell>
                                <TableCell>{patient.phone_number}</TableCell>
                                <TableCell>{patient.home_number}</TableCell>
                                <TableCell>{patient.problem}</TableCell>
                                <TableCell>{patient.assignto}</TableCell>
                                <TableCell>{patient.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}