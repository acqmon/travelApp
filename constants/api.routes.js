export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER_USER: "/api/auth/register/user",
    REGISTER_PARTNER: "/api/auth/register/partner",
  },
  USERS: {
    GET_ALL_USERS: "/api/users/users-list",
  },
  PACKAGES: {
    CREATE_PACKAGE: "/api/packages/create-package",
    PACKAGE_LIST: "/api/packages/package-list",
    PACKAGE_LIST_USER: "/api/packages/package-list-user",
  },
  BOOKINGS: {
    CREATE_BOOKING: "/api/bookings/create-booking",
    USER_BOOKINGS: "/api/bookings/user-bookings",
    PARTNER_BOOKINGS_LIST: "/api/bookings/partner-booking-list",
  },
};
