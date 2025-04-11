export const generateUniqueId = () => {
  return crypto.randomUUID();
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
    } else {
      try {
        window.navigator.geolocation.getCurrentPosition(
          (position, error) => {
            if (error) {
              console.log("error", error);
              reject(error.message);
            } else {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            }
          },
          (error) => reject(error.message)
        );
      } catch (error) {
        console.log("error", error);
        reject(error.message);
      }
    }
  });
};

export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const { address, display_name } = await response.json();
    return {
      fullAddress: display_name,
      city: address?.city,
      country: address?.country,
      countryCode: address?.country_code,
      lga: address?.county,
      postcode: address?.postcode,
      road: address?.road,
      state: address?.state,
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return new Error("Error retrieving address");
  }
};

export const getUserAddress = async () => {
  const coords = await getUserLocation();
  const address = await getAddressFromCoords(coords.latitude, coords.longitude);
  return { ...address, ...coords };
};

export const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (angle * Math.PI) / 180; // Convert degrees to radians

  const R = 3958.8; // Radius of Earth in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in miles
};

export const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (angle * Math.PI) / 180; // Convert degrees to radians

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};
