import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import Footer from "../../../components/Footer"
// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationSelector = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates([lng, lat]);
    },
  });
  return null;
};

const EventManager = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState('');
  const [selectedCoords, setSelectedCoords] = useState(null);
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '', date: '', startTime: '', endTime: '',
      organizerId: '', organizerName: '', organizerEmail: '', organizerPhone: '',
      description: '', arrangements: [''], foodItems: [''], seats: '',
      price: '', offer: '', eventType: [''], eventImages: [''],
      location: { type: 'Point', coordinates: [] },
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control, name: 'eventImages' });
  const { fields: foodFields, append: appendFood, remove: removeFood } = useFieldArray({ control, name: 'foodItems' });
  const { fields: arrangementFields, append: appendArrangement, remove: removeArrangement } = useFieldArray({ control, name: 'arrangements' });

  const eventTypes = ['Conference', 'Workshop', 'Seminar', 'Party', 'Concert', 'Exhibition','Sports', 'Trending', 'Hot', 'Mostbooked', 'Other'];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserLocation(coords);
    }, (err) => console.warn('Geolocation error:', err.message));
  }, []);

  useEffect(() => {
    if (selectedCoords) {
      setValue('location.coordinates', selectedCoords);
    }
  }, [selectedCoords, setValue]);

  useEffect(() => {
    const organizerId = localStorage.getItem("organizerId");
    if (organizerId) {
      setValue('organizerId', organizerId);
    }
  }, [setValue]);

const onSubmit = (data) => {
  if (!data.location.coordinates.length) {
    alert('Please select a location on the map');
    return;
  }

  // Save event data in localStorage temporarily
  localStorage.setItem('pendingEventData', JSON.stringify(data));
  
  // Navigate to bank details page
  navigate('/organizer-dashboard/bank-details');
};


  return (
    <>
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create a New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Event Name</label>
            <input {...register('name', { required: true })} className="w-full p-2 border rounded" />
            {errors.name && <span className="text-sm text-red-500">Required</span>}
          </div>
          <div>
            <label className="block font-medium">Event Type</label>
            <select {...register('eventType.0', { required: true })} className="w-full p-2 border rounded">
              <option value="">Select type</option>
              {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            {errors.eventType && <span className="text-sm text-red-500">Required</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium">Date</label>
            <input type="date" {...register('date', { required: true })} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block font-medium">Start Time</label>
            <input type="time" {...register('startTime', { required: true })} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block font-medium">End Time</label>
            <input type="time" {...register('endTime', { required: true })} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block font-medium">Seats</label>
            <input type="number" {...register('seats', { required: true })} className="p-2 border rounded w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="number" {...register('price', { required: true })} className="p-2 border rounded" placeholder="Price" />
          <input {...register('offer')} className="p-2 border rounded" placeholder="Offer (optional)" />
        </div>

        <textarea {...register('description')} rows="3" className="w-full p-2 border rounded" placeholder="Description"></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input {...register('organizerName', { required: true })} className="p-2 border rounded" placeholder="Organizer Name" />
          <input type="email" {...register('organizerEmail', { required: true })} className="p-2 border rounded" placeholder="Organizer Email" />
          <input {...register('organizerPhone', { required: true })} className="p-2 border rounded" placeholder="Phone" />
          <input type="hidden" {...register('organizerId', { required: true })} />
        </div>

        <input type="text" className="w-full p-2 border rounded" value={manualAddress} onChange={(e) => setManualAddress(e.target.value)} placeholder="Manual Address (optional)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Food Items</label>
            {foodFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input {...register(`foodItems.${index}`)} className="flex-1 p-2 border rounded" />
                <button type="button" onClick={() => removeFood(index)} className="text-red-500">X</button>
              </div>
            ))}
            <button type="button" onClick={() => appendFood('')} className="text-blue-600">+ Add Food</button>
          </div>

          <div>
            <label className="font-medium">Arrangements</label>
            {arrangementFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input {...register(`arrangements.${index}`)} className="flex-1 p-2 border rounded" />
                <button type="button" onClick={() => removeArrangement(index)} className="text-red-500">X</button>
              </div>
            ))}
            <button type="button" onClick={() => appendArrangement('')} className="text-blue-600">+ Add Arrangement</button>
          </div>
        </div>

        <div>
          <label className="font-medium">Event Images (URL)</label>
          {imageFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input {...register(`eventImages.${index}`)} className="flex-1 p-2 border rounded" placeholder="Image URL" />
              <button type="button" onClick={() => removeImage(index)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => appendImage('')} className="text-blue-600 mb-2">+ Add Image URL</button>
        </div>

        {userLocation && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-2">Map View (Click to select location)</h4>
            <MapContainer center={userLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationSelector setCoordinates={setSelectedCoords} />
              {selectedCoords && (
                <Marker position={[selectedCoords[1], selectedCoords[0]]}>
                  <Popup>Selected Location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}

        <div className="mt-6">
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Submit Event</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default EventManager;
