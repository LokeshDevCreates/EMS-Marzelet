import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/venues');
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/organizers');
        setOrganizers(response.data);
      } catch (error) {
        console.error('Error fetching organizers:', error);
      }
    };

    fetchOrganizers();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const renderTable = (headers, rows, rowKey, dataKey) => (
    <div className="overflow-hidden">
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border text-center border-gray-300 px-2 py-2 sm:px-4 sm:py-3"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              className="text-center even:bg-gray-50 odd:bg-white"
            >
              {dataKey.map((key, index) => (
                <td
                  key={index}
                  className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-3"
                >
                  {Array.isArray(row[key])
                    ? row[key].join(', ')
                    : key === 'createdAt'
                    ? new Date(row[key]).toLocaleString()
                    : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
        Attendee Details
      </h1>
      {renderTable(
        ['Username', 'Email', 'Role', 'Timestamp'],
        users,
        '_id',
        ['username', 'email', 'role', 'createdAt']
      )}

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-800">
        Venue Details
      </h1>
      {renderTable(
        ['Venue Name', 'Location', 'Capacity', 'Amenities', 'Timestamp'],
        venues,
        '_id',
        ['name', 'location', 'capacity', 'amenities', 'createdAt']
      )}

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-800">
        Organizer Details
      </h1>
      {renderTable(
        ['Organizer Name', 'Organization', 'Email', 'Timestamp'],
        organizers,
        '_id',
        ['name', 'organization', 'email', 'createdAt']
      )}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-800">
        Booking Details
      </h1>
      {renderTable(
        ['Name', 'Phone', 'Category', 'Event Date', 'Payment Method', 'Timestamp'],
        bookings,
        '_id',
        ['name', 'phone', 'category', 'eventDate', 'paymentMethod', 'createdAt']
      )}
       
    </div>
  );
};

export default Dashboard;
