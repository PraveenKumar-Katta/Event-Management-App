import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { setLocation } from '../features/eventCreationSlice';
import { useDispatch } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { Search } from 'lucide-react';

// Component to update map view when searched
const SearchHandler = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, 13);
  }
  return null;
};

// Component to handle map click for marker
const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const LocationPicker = ({ setStep }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchedPosition, setSearchedPosition] = useState(null);
  const [address, setAddress] = useState('Unknown');
  const[loading,setLoading]=useState(false)
  const dispatch = useDispatch();

  // Fetch address using reverse geocoding
  const fetchAddress = async (lat, lng) => {
    const targetURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&email=praveenkumar5500u@gmail.com`;
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetURL)}`);
      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      setAddress(parsedData.display_name);
      dispatch(setLocation({ lat, lng, address: parsedData.display_name }));
    } catch (err) {
      console.error('Reverse geocoding failed:', err.message);
      setAddress('Unable to fetch address');
    }
  };

  // Handle map click
  const handleMapClick = (lat, lng) => {
    const latLng = [lat, lng];
    setMarkerPosition(latLng);
    fetchAddress(lat, lng);
  };

  // Handle location search
  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      searchInput
    )}&format=json&limit=1`;
    setLoading(true)
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const parsed = JSON.parse(data.contents);

      if (parsed.length > 0) {
        const { lat, lon, display_name } = parsed[0];
        const latLng = [parseFloat(lat), parseFloat(lon)];
        setMarkerPosition(latLng);
        setSearchedPosition(latLng);
        setAddress(display_name);
        dispatch(setLocation({ lat, lng: lon, address: display_name }));
      } else {
        alert('Location not found!');
      }
    } catch (err) {
      console.error('Search failed:', err.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="space-y-6 p-6 border h-fit mb-10 dark:bg-gray-800 rounded-lg shadow-md">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Select Event Location
      </h3>

      {/* Search Input */}
      <div className="mb-5 px-2 flex items-center justify-center gap-4 py-2 rounded-xl">
        <input
          className="bg-white p-2 rounded-full w-full text-black"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Location here."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition"
        >
          <Search />
        </button>
      </div>

      {/* Map */}
      {loading&&<div className='flex justify-center items-center'>
        <div className='w-10 h-10 border-5 border-white border-t-transparent rounded-full animate-spin'>
          
        </div>
      </div>}
      <MapContainer
        center={[20.5937, 78.9629]} // Default to India center
        zoom={5}
        className="h-[200px] w-[80%] rounded-md border border-gray-300 dark:border-gray-600 shadow-sm"
      >
        <TileLayer
          attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:filter dark:grayscale dark:brightness-75"
        />
        <MapClickHandler onClick={handleMapClick} />
        <SearchHandler position={searchedPosition} />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>

      {/* Display Info */}
      {markerPosition && (
        <div className="animate-fade-in  h-fit bg-gray-100 dark:bg-gray-700 rounded-md p-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Selected Coordinates:</strong>{' '}
            {markerPosition.map((coord) => coord.toFixed(4)).join(', ')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <strong className="text-gray-900 dark:text-gray-100">Address:</strong> {address}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-6 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setStep(4)}
          disabled={!markerPosition}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            markerPosition
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;
