import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Header } from "../components/header";
import Loading from "../components/loading";
import ReactPaginate from "react-paginate";
import { getDistanceInMiles, getDistanceInKm } from "../utils/index";
import { handleAppError } from "../utils/error-handler";
import { Footer } from "../components/footer";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export function StoreLocator() {
  const [searching, setSearching] = useState(true);
  const [searchAddress, setSearchAddress] = useState("");
  const [stores, setStores] = useState([]);
  const [searched, setSearched] = useState(false);
  const [distanceType, setDistanceType] = useState("km");
  const [searchBody, setSearchBody] = useState({});
  const [debouncedSearchAddress, setDebouncedSearchAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const inputRef = useRef();

  const { latitude, longitude } = localStorage.getItem("ajs_user_traits")
    ? JSON.parse(localStorage.getItem("ajs_user_traits"))
    : {
        latitude: 6.465422,
        longitude: 3.406448,
      };
  const userLocation = {
    lng: longitude ?? 3.406448,
    lat: latitude ?? 6.465422,
  };

  useEffect(() => {
    // initializes map
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: stores.length
        ? [stores[0].lng, stores[0].lat]
        : [userLocation.lng, userLocation.lat],
      zoom: 10,
    });

    stores.forEach(({ lng, lat, title }) => {
      const marker = new mapboxgl.Marker({ color: "#ff3b1d" })
        .setLngLat([lng, lat])
        .addTo(map.current);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${title}</h3>`
      );

      // ✅ Correct way to attach the popup to the marker
      marker.setPopup(popup);
    });

    return () => map.current?.remove();
  }, [userLocation.lat, userLocation.lng, stores]);

  useEffect(() => {
    // debounces search address and tracks when store address is entered
    if (!searchAddress.length) return;
    // if (Object.keys(searchBody).length) setSearchBody({});
    const timeout = setTimeout(() => {
      setDebouncedSearchAddress(searchAddress);
      //   trackEvent("Store Address Entered", {
      //     address: searchAddress,
      //   });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchAddress]);

  useEffect(() => {
    // loads google maps api and initializes autocomplete
    const googleScript = document.createElement("script");
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_ADDRESS_MAP_KEY}&libraries=places`;
    googleScript.async = true;
    googleScript.defer = true;

    googleScript.onload = () => {
      // Initialize Autocomplete after Google Maps script is loaded
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
          }
        );

        autocomplete.addListener("place_changed", async () => {
          const place = autocomplete.getPlace();
          if (!place?.geometry?.location) {
            return setSearchBody({ searchTerm: place?.name });
          }
          const {
            address_components,
            geometry: { location },
          } = place;
          const coordinates = {
            latitude: location.lat(),
            longitude: location.lng(),
          };
          const { long_name: city } = address_components.find((el) =>
            el.types.includes("locality")
          );
          let subcity = null;
          if (
            address_components.find((el) => el.types.includes("sublocality"))
          ) {
            const subCityData = address_components.find((el) =>
              el.types.includes("sublocality")
            );
            subcity = subCityData?.long_name;
          }
          let neighborhood = null;
          if (
            address_components.find((el) => el.types.includes("neighborhood"))
          ) {
            const neighborhoodData = address_components.find((el) =>
              el.types.includes("neighborhood")
            );
            neighborhood = neighborhoodData?.long_name;
          }
          setSearchAddress(place.formatted_address);
          setSearchBody({
            tenant: process.env.REACT_APP_TENANT_ID,
            searchTerm:
              neighborhood ?? city ?? subcity ?? place.formatted_address,
            coordinates,
          });
        });
      }
    };

    document.head.appendChild(googleScript);
    return () => {
      // Cleanup: remove the script when the component unmounts
      document.head.removeChild(googleScript);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchAddress]); // Empty dependency array ensures that this useEffect runs only once on mount

  const handleCalculateDistance = (distanceType, ...rest) => {
    if (distanceType === "mi") {
      return getDistanceInMiles(...rest);
    }
    return getDistanceInKm(...rest);
  };

  const formatStores = (stores) => {
    return stores
      .map((store) => {
        const {
          coordinates,
          formattedAddress,
          streetName,
          outletBusinessName,
        } = store;
        return {
          lng: coordinates.longitude,
          lat: coordinates.latitude,
          address: formattedAddress || streetName,
          distance: Object.keys(searchBody).length
            ? handleCalculateDistance(
                distanceType,
                searchBody.coordinates.latitude,
                searchBody.coordinates.longitude,
                coordinates.latitude,
                coordinates.longitude
              ).toFixed(2)
            : null,
          storeName: outletBusinessName,
          title: outletBusinessName,
        };
      })
      .sort((a, b) => a.distance - b.distance);
  };

  const handleSearch = async () => {
    try {
      if (!searchAddress) return;
      let body = searchBody;
      if (!searchBody.searchTerm)
        body = {
          tenant: process.env.REACT_APP_TENANT_ID,
          searchTerm: searchAddress,
        };
      setLoading(true);
      //   trackEvent("Store Address Searched", {
      //     address: searchAddress,
      //   });
      const response = await fetch(
        "https://qn6x4esklh.execute-api.us-east-1.amazonaws.com/prod/stores",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      // saves all the search results
      setSearchResults([...data]);
      // saves pagination info
      setPagination({
        page: 0,
        pageSize: 10,
        pages: Math.ceil(data.length / 10),
        total: data.length,
      });
      let stores = data.slice(0, 10);
      stores = formatStores(stores);
      if (stores.length)
        // trackEvent("Search Results Viewed", {
        //   address: searchAddress,
        //   results: stores.length,
        // });
        setStores(stores);
      setLoading(false);
      setSearched(true);
    } catch (error) {
      handleAppError();
      setLoading(false);
    }
  };

  const changeDistanceType = (distanceType) => {
    setDistanceType(distanceType);
    setLoading(true);
    const timeout = setTimeout(() => {
      const storesss = stores.map((el) => {
        return {
          ...el,
          distance: Object.keys(searchBody).length
            ? handleCalculateDistance(
                distanceType,
                searchBody.coordinates.latitude,
                searchBody.coordinates.longitude,
                el.lat,
                el.lng
              ).toFixed(2)
            : null,
        };
      });
      setStores([...storesss]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const handlePageChange = (page) => {
    try {
      document.getElementById("store-list").scroll({ top: 0 });
      setLoading(true);
      const timeout = setTimeout(() => {
        const startFrom = page * pagination.pageSize;
        const endAt = startFrom + pagination.pageSize;
        const stores = searchResults.slice(startFrom, endAt);
        setStores([...formatStores(stores)]);
        setPagination({ ...pagination, page });
        window.scroll({ top: 0 });
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } catch (error) {
      setLoading(false);
    }
  };

  const zoomAStore = (store) => {
    // zooms in on a store
    if (store && map.current) {
      map.current.flyTo({
        zoom: 17,
        center: [store.lng, store.lat],
      });
    }
  };

  const viewAStore = (store) => {
    // called when a store is viewed
    if (store && map.current) {
      //   trackEvent("Store Viewed", {
      //     storeName: store.storeName,
      //     address: store.address,
      //   });
      openInGoogleMaps(store.address);
    }
  };

  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="store-locator">
      <Header />
      <div className="store-locator-container">
        <div className="">
          <div className="store-locator-header">
            <h1>Find Mangrove Foods near you</h1>
            <div className="store-locator-header_search-container">
              <div className="store-locator-header_search-container_form-group">
                <input
                  type="text"
                  placeholder="Enter your city or zipcode"
                  ref={inputRef}
                  onChange={({ target: { value } }) => {
                    if (!searching) setSearching(true);
                    setSearchAddress(value);
                  }}
                  value={searchAddress}
                />
                {searchAddress.length ? (
                  <i
                    className={`bi bi-x-circle-fill clear-address ${
                      loading ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (loading) return;
                      setSearchAddress("");
                      setSearchBody({});
                      setDebouncedSearchAddress("");
                    }}
                  ></i>
                ) : (
                  <i className="bi bi-crosshair2"></i>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchAddress || loading}
              >
                {loading ? <Loading /> : "Search"}
              </button>
            </div>
          </div>
          <div className="store-locator-content">
            <div className="row">
              <div className="col-md-3 col-12">
                <div className="store-locator-content_stores">
                  {stores.length && !loading ? (
                    <div className="header-section">
                      <p>
                        Showing{" "}
                        {!pagination.page
                          ? "1"
                          : pagination.page * pagination.pageSize + 1}{" "}
                        -{" "}
                        {(pagination.page + 1) * pagination.pageSize >
                        pagination.total
                          ? pagination.total
                          : (pagination.page + 1) * pagination.pageSize}{" "}
                        of {pagination.total}
                      </p>
                      <select
                        className="distance-type-select"
                        onChange={({ target: { value } }) =>
                          changeDistanceType(value)
                        }
                        value={distanceType}
                      >
                        <option value="km">(km)</option>
                        <option value="mi">(mi)</option>
                      </select>
                    </div>
                  ) : null}
                  {!stores.length || loading ? (
                    <div className="no-results">
                      {loading ? (
                        <Loading />
                      ) : !loading && searched && !stores.length ? (
                        <>
                          <h5>No results found</h5>
                          <p>Please try a different address</p>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search"></i>
                          <h5>Please enter an address</h5>
                          <p>
                            We'll search for stores near you based on your
                            address
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="store-list" id="store-list">
                      {stores.map((store, key) => (
                        <div
                          key={key}
                          className="item"
                          onClick={() => zoomAStore(store)}
                        >
                          <h5>{store.storeName}</h5>
                          <h6>{store.address}</h6>
                          <div className="distance">
                            <p>
                              {store.distance ? (
                                <>
                                  {store.distance} {distanceType} away
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                            <button onClick={() => viewAStore(store)}>
                              <p>Directions</p>
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.length > 10 && !loading && (
                    <div className="pagination-container">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={({ selected: page }) =>
                          handlePageChange(page)
                        }
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
                        pageCount={Math.ceil(
                          searchResults.length / pagination.pageSize
                        )}
                        forcePage={pagination.page}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="store-locator-content_map">
                  <div className="map-wrapper">
                    <div
                      id="map"
                      ref={mapContainer}
                      style={{
                        width: "100%",
                        height: "600px",
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="store-locator-content_map"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
