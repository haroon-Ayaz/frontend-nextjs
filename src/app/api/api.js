// src/app/api/api.js

export async function fetchApiData(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers, // Merge existing headers
                "User-Agent": "Chrome/119.0.0.0", // Add user agent
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Response Status:", response.status);
            console.error("Response Headers:", Object.fromEntries(response.headers.entries()));
            const text = await response.text();
            console.error("Response Body:", text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function sendApiData(url, options = {}, body) {
    try {
      const response = await fetch(url, {
        ...options,
        method: "POST",
        headers: {
          ...options.headers,
          "User-Agent": "Chrome/119.0.0.0",
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Response Status:", response.status);
        console.error("Response Headers:", Object.fromEntries(response.headers.entries()));
        const text = await response.text();
        console.error("Response Body:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
}
