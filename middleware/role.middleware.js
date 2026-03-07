export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.Role.code)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
}
