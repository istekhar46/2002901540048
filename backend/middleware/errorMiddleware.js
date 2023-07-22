// Centralized error handling middleware
export const errorHandler = ((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: 'Something went wrong.' });
  });


//   export default errorHandler