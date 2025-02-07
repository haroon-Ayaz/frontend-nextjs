import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err);
                setData(null); // Clear data on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Re-fetch if the URL changes

    return { data, loading, error };
}

export default useFetch;