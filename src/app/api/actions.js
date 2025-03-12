// src/app/api/actions.js
"use server";

import { fetchApiData, sendApiData } from "./api";

const BASE_API_URL = "https://flask-nine-green.vercel.app";

export async function getClinicians() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/get_clinicians`);
}

export async function getStatistics() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/get_statistics`);
}

export async function getStats() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/get_stats`)
}

export async function getPatients() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/raw_new_test_patient`);
}

// In src/app/api/actions.js
export async function getCustomPatientDataSet({ key_code }) {
  if (typeof key_code !== "string" && typeof key_code !== "number") {
    throw new Error("key_code must be a primitive value (string or number).");
  }
  const url = `${BASE_API_URL}/api/v2/custom_data_fetching`;
  return await sendApiData(
    url,
    { method: "POST", headers: { "Content-Type": "application/json" } },
    { key_code }
  );
}

export async function getDischargedPatients() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/get_discharged_patients_from_key_code`)
}

export async function dischargePatients({ rxkid, discharge_notes, recovery_instructions }) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/v2/discharge_patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rxkid, discharge_notes, recovery_instructions })
    });

    if (!response.ok) throw new Error("Failed to fetch ongoing procedures");

    return await response.json();
  } catch (error) {
    console.error("Error fetching ongoing procedures:", error);
    throw error;
  }
}

/**
 * assignPatient now accepts an object containing patient_id and assigned_to,
 * and sends a POST request to the assignpatient endpoint.
 */
export async function assignPatient(data) {
  return await sendApiData(
    `${BASE_API_URL}/api/v2/assign_patient`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    data
  );
}

/**
 * sendSMS sends an SMS by calling the send_sms endpoint.
 * This function sends a JSON body with the keys:
 *   - recipient_number
 *   - date
 * which matches the structure of your working curl command.
 */
export async function sendSMS(recipientNumber, date) {
  try {
    const result = await sendApiData(
      `${BASE_API_URL}/api/v2/send_sms`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      { recipient_number: recipientNumber, date }
    );
    console.log("SMS sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

/**
 * handlePatientAssignment calls the assignPatient endpoint with the provided
 * patient_id and assigned_to. After a successful assignment, it sends an SMS.
 *
 * @param {Object} params - Object containing assignment details.
 * @param {string|number} params.patient_id - A primitive value representing the patient's ID.
 * @param {string} params.assigned_to - The clinician's name.
 * @param {string} params.recipient_number - The phone number to send the SMS.
 * @param {string} params.appointment_date - A formatted date string.
 * @returns {Object} An object containing both assignment and SMS results.
 */
export async function handlePatientAssignment({ patient_id, assigned_to }) {
  console.log("Recieved Patient ID In `handlePatientAssignment` Func: ", patient_id, " Assigned To: ", assigned_to)
  // Ensure patient_id is a primitive
  if (typeof patient_id !== "string" && typeof patient_id !== "number") {
    throw new Error("patient_id must be a primitive value (string or number).");
  }

  try {
    // Call the assignPatient endpoint with plain data
    const assignResult = await assignPatient({ patient_id, assigned_to });
    console.log("Patient assigned successfully:", assignResult);

    // Call sendSMS after successful patient assignment
    return { assignResult };
  } catch (error) {
    console.error("Error in handlePatientAssignment:", error);
    throw error;
  }
}

export async function getPatientCallLogs({ patient_rxkid }) {
  if (typeof patient_rxkid !== "string" && typeof patient_rxkid !== "number") {
    throw new Error("patient_rxkid must be a primitive value (string or number).");
  }
  try {
    const url = `${BASE_API_URL}/api/v2/get_call_logs`;
    console.log("Complete URL: ", url)
    // Use sendApiData to include a JSON body with rxkid in the options parameter.
    return await sendApiData(
      url,
      { method: "POST", headers: { "Content-Type": "application/json" } },
      { rxkid: patient_rxkid }
    );
  } catch (error) {
    console.error("Error in getPatientCallLogs", error);
    throw error;
  }
}

export async function updatePatientComments({ patientId, comment }) {
  return await sendApiData(`${BASE_API_URL}/api/v2/update_comments`, {}, { patientId, comment });
}

export async function updatePatientCallLogs({ patientId, date, time, comment }) {
  return await sendApiData(`${BASE_API_URL}/api/v2/update_call_logs`, {}, { patientId, date, time, comment });
}

export async function refreshDatabase() {
  return await fetchApiData(`${BASE_API_URL}/api/v2/refresh_database`)
}

export async function getOnGoingProcedurePatients({ fullName, role }) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/v2/ongoing_procedures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname: fullName.split(" ")[0], lname: fullName.split(" ")[1], user_role: role })
    });

    if (!response.ok) throw new Error("Failed to fetch ongoing procedures");

    return await response.json();
  } catch (error) {
    console.error("Error fetching ongoing procedures:", error);
    throw error;
  }
}