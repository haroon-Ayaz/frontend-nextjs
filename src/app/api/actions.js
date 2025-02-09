// src/app/api/actions.js
"use server";

import { fetchApiData, sendApiData } from "./api";

const BASE_API_URL = process.env.UPDATE_API;

export async function getClinicians() {
  return await fetchApiData(`${BASE_API_URL}/api/get_clinicians`);
}

export async function getStatistics() {
  return await fetchApiData(`${BASE_API_URL}/api/get_statistics`);
}

export async function getPatients() {
  return await fetchApiData(`${BASE_API_URL}/api/getdata`);
}

export async function getDischargedPatients() {
  return await fetchApiData(`${BASE_API_URL}/api/get_discharged_patients`)
}

/**
 * assignPatient now accepts an object containing patient_id and assigned_to,
 * and sends a POST request to the assignpatient endpoint.
 */
export async function assignPatient(data) {
  return await sendApiData(
    `${BASE_API_URL}/api/assignpatient`,
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
const sendSMS = async (recipientNumber, date) => {
  try {
    const result = await sendApiData(
      `${BASE_API_URL}/api/send_sms`,
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
export async function handlePatientAssignment({ patient_id, assigned_to, recipient_number, appointment_date }) {
  // Ensure patient_id is a primitive
  if (typeof patient_id !== "string" && typeof patient_id !== "number") {
    throw new Error("patient_id must be a primitive value (string or number).");
  }

  try {
    // Call the assignPatient endpoint with plain data
    const assignResult = await assignPatient({ patient_id, assigned_to });
    console.log("Patient assigned successfully:", assignResult);

    // Call sendSMS after successful patient assignment
    const smsResult = await sendSMS(recipient_number, appointment_date);
    return { assignResult, smsResult };
  } catch (error) {
    console.error("Error in handlePatientAssignment:", error);
    throw error;
  }
}


export async function addPatient() {

}