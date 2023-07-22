import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function App() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {

        const response = await axios.get(process.env.URL);
        setTrains(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch train details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Train Schedule</h1>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Sleeper Seats</th>
            <th>AC Seats</th>
            <th>Delay (minutes)</th>
            <th>Price (AC)</th>
            <th>Price (Sleeper)</th>
          </tr>
        </thead>
        {/* <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{train.departureTime}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.delayedBy}</td>
              <td>{train.price.AC}</td>
              <td>{train.price.sleeper}</td>
            </tr>
          ))}
        </tbody> */}
      </Table>
    </Container>
  );
}

export default App;
