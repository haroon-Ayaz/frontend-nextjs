"use server";

import { loadEnvConfig } from "@next/env";
import { cookies, headers } from "next/headers";


const projectDir = process.cwd();
loadEnvConfig(projectDir);

console.log(`The Base API is as follows: ${process.env.BASE_API}`)

export async function fetchPatients() {
  const BASE_URL = process.env.BASE_API;
  const completeUrl = `${BASE_URL}/api/getdata`;
  console.log(`Complete URL: ${completeUrl}`);

  const headersList = await headers();

  console.log(`Cookies coming in headers are as follows: ${headersList.get("cookie")}`);

  const response = await fetch(completeUrl, {
    headers: {
      Cookie: headersList.get("cookie") || "", // Forward client cookies
    },
  });

  if (!response.ok) {
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Status Text: ${response.statusText}`);
    throw new Error(`HTTPS Error <fetchPatients> : ${response.statusText}`);
  }
  return response.json();
}

export async function assignPatientAPI({ patientId, clinician, appointmentDate, appointmentTime }) {
  const response = await fetch(`${process.env.BASE_API}/api/assignpatient`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patient_id: patientId, assigned_to: clinician, appointmentDate, appointmentTime }),
  });
  if (!response.ok) {
    throw new Error("Failed to assign patient");
  }
  return response.json();
}
