import { use, useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useFetch called", url);

    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching:", url);

        const res = await fetch(url);
        const json = await res.json();

        console.log("API response:", json);

        setData(json.results || []);
      } catch (err) {
        console.log("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    console.log("Data updated in useFetch:", data);
  }, [data]);

  return { data, loading, error };
}
