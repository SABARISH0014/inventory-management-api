// Role-based authorization middleware
// Usage: authorize("admin", "manager") - allows admin and manager roles

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}. Your role: ${userRole}`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Authorization error"
      });
    }
  };
};

module.exports = authorize;
