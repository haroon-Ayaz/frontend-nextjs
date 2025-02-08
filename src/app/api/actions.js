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

export async function assignPatient() {
    return await sendApiData(`${BASE_API_URL}/api/assignpatient`);
}