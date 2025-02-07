/**
 * Generic function to fetch JSON data from a given URL.
 * @param {string} url - The API endpoint.
 * @returns {Promise<any>} - Parsed JSON response.
 */
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


export async function fetchGetData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}