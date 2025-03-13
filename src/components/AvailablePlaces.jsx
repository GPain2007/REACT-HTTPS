import Places from "./Places.jsx";
import { useFetch } from "../hooks/useFetch.js";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  async function fetchSortPlaces() {
    const places = await fetchAvailablePlaces();

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces);
      });
    });
  }

  if (error) {
    return <Error title="Error" message={error.message} />;
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
