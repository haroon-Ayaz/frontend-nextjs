// updates/utils/waitingList.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TableComponent from "../componenets/tableComponent";

export default function WaitingList() {
    const [role, setRole] = useState("");
    const [patientList, setPatientList] = useState([]);
    const [clinicianList, setClinicianList] = useState([]);
    const router = useRouter();

    // Fetch waiting patients data
    const fetchPatients = async () => {
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/get_waiting_patients");
            const data = await response.json();
            setPatientList(data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    };

    // Fetch clinicians data
    const fetchClinicians = async () => {
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/get_clinicians");
            const data = await response.json();
            setClinicianList(data["clinicians"]);
        } catch (error) {
            console.error("Error fetching clinician data:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
        const patientInterval = setInterval(fetchPatients, 2000);
        return () => clearInterval(patientInterval);
    }, []);

    useEffect(() => {
        fetchClinicians();
        const clinicianInterval = setInterval(fetchClinicians, 2000);
        return () => clearInterval(clinicianInterval);
    }, []);

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        if (!storedRole) {
            router.push("/auth/login");
        } else {
            setRole(storedRole);
        }
    }, [router]);

    // Convert clinician objects to simple name strings
    const clinicians = clinicianList.map(c => `${c.fname} ${c.lname}`);

    // Function to assign a patient to a clinician
    const assignPatient = async (patientId, clinician) => {
        console.log("Assigning Patient", patientId);
        console.log("Clinician", clinician);
        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/assignpatient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ patient_id: patientId, assigned_to: clinician }),
            });
            if (response.ok) {
                console.log(`Patient ${patientId} assigned to ${clinician}`);
                alert("Patient Assigned Successfully");
            } else {
                console.error("Failed to assign patient.");
            }
        } catch (error) {
            console.error("Error assigning patient:", error);
        }
    };

    // Define the table columns for patient data
    const columns = [
        { id: "rxkid", label: "RXK ID" },
        { id: "title", label: "Title" },
        { id: "fname", label: "First Name" },
        { id: "lname", label: "Last Name" },
        { id: "address", label: "Address" },
        { id: "postcode", label: "Post Code" },
        { id: "phone_number", label: "Phone Number" },
        { id: "home_number", label: "Home Number" },
        { id: "problem", label: "Problem" }
    ];

    return (
        <TableComponent
            columns={columns}
            data={patientList}
            role={role}
            clinicians={clinicians}
            onAssignPatient={assignPatient}
        />
    );
}
