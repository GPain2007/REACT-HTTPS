import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Something went wrong",
        });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);
  return { error, isFetching, fetchedData, setFetchedData, setIsFetching };
}
