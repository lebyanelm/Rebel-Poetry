// Environment for development values
const developmnent = {
  ENV: "development",
  BACKEND: "http://localhost:5000/api",
  FRONTEND: "https://rebbelpoetry.com"
};

// Environment for production values
const production = {
  ENV: "production",
  BACKEND: "https://apis.rebbelpoetry.com/api",
  FRONTEND: "https://rebbelpoetry.com"
};

// Environment for testing values
const testing = {
  ENV: "testing",
  BACKEND: "http://localhost:5000/api",
  FRONTEND: "http://localhost:3000"
};

// Environment for all values - doesn't depend on any environment it's always there
const config = {
  APP_NAME: "Rebbel Poetry",
  ...(process.env.NODE_ENV === "development"
    ? developmnent
    : process.env.NODE_ENV === "production"
    ? production
    : testing),
};

export default config;
