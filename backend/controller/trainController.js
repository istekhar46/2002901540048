import asyncHandler from 'express-async-handler';
import axios from 'axios';


// resister user ..
const registerUser =asyncHandler ( async (req, res) => {
    try {
     
      const response = await axios.post('http://20.244.56.144/train/register', req.body);
  
      // Return the response from the John Doe Railway Server
      res.json(response.data);
    } catch (error) {
      // Handle any errors that occur during the registration process
      res.status(error.response.status || 500).json({
        error: 'Failed to register your company. Please try again later.',
      });
    }
  });
  

  // authorization .. 

  const userAuth = asyncHandler( async (req, res) => {
    try {
      const response = await axios.post('http://20.244.56.144/train/auth', req.body);
  
      // Return the response from the Server
      res.json(response.data);
    } catch (error) {
      // Handle any errors that occur during the authorization process
      res.status(error.response.status || 500).json({
        error: 'Failed to obtain the Authorization Token. Please try again later.',
      });
    }
  });
  


// getting trains 
const getTrains = async (req, res) => {
  try {
    const authorizationToken = req.headers.authorization;
    const response = await axios.get('http://20.244.56.144/train/trains', {
      headers: {
        Authorization: authorizationToken,
      },
    });

    // Filter the trains based on the given criteria
    const currentTime = moment();
    const filteredTrains = response.data.filter((train) => {
      const departureTime = moment(train.departureTime);
      const timeDifference = departureTime.diff(currentTime, 'minutes');
      return timeDifference >= 30;
    });

    // Sort the filtered trains based on price, seats availability, and departure time
    filteredTrains.sort((a, b) => {
      if (a.price.AC === b.price.AC) {
        if (a.seatsAvailable.AC === b.seatsAvailable.AC) {
          return b.departureTime.delayedBy - a.departureTime.delayedBy;
        }
        return a.seatsAvailable.AC - b.seatsAvailable.AC;
      }
      return a.price.AC - b.price.AC;
    });

    // Return the sorted and filtered trains as the API response
    res.json(filteredTrains);
  } catch (error) {
    // Handle any errors that occur during the API call or data processing
    if (error.response && error.response.status) {
      // If error has response property, use the status code from the response
      res.status(error.response.status).json({
        error: 'Failed to fetch train details. Please try again later.',
      });
    } else {
      // If error does not have response property, use a generic 500 status code
      res.status(500).json({
        error: 'Failed to fetch train details. Please try again later.',
      });
    }
  }
};


  

export {
     getTrains,registerUser,userAuth
}