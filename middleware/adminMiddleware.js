const adminMiddleware = (req, res, next) => {
    // Basic example: check if a request has a custom header "x-admin: true"
    const isAdmin = req.headers['x-admin'] === 'true';
  
    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
  
    next();
  };
  
  export default adminMiddleware;
  