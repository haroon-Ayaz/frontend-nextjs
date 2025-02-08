// src/app/api/actions.js
"use server";

import { fetchApiData } from "./api";

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