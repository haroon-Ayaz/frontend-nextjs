"use server"

import { fetchGetData } from "@/app/updates/utils/utils";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const getPatientData = async () => {
    const BASE_URL = process.env.BASE_API;
    const completeUrl = `${BASE_URL}/api/getdata`;
    console.log(`Complete URL: ${completeUrl}`);
    return fetchGetData(completeUrl);
}