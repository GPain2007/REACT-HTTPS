import { useState, useEffect } from "react";

import Places from "./Places.jsx";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        setAvailablePlaces(data.places);
      } catch (error) {
        setError(error.message);
      }

      setIsFetching(false);
    }

    fetchPlaces();

    // fetch("http://localhost:3000/places")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setAvailablePlaces(data.places);
    //   });
  }, []);

  if (error) {
    return (
      <Error
        title="Error"
        message={error.message}
        onConfirm={() => setError(null)}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Places are Loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
