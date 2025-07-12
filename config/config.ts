const BASE_URL_PROD = "https://app.pre-prod.portpro.io";
const BASE_URL_DISPATCHER = "https://app.portpro.io/tms/Dispatcher";
const BASE_URL_EU = "https://eu.portpro.io";
const BASE_URL_UNIVERSAL = "https://universal.portpro.io";
const BASE_URL_MEDLOG = "https://medlog.portpro.io";

type PATH_URL = "prod" | "dispatcher" | "eu" | "universal" | "medlog";

const handleTestUrl = (type: PATH_URL) => {
  switch (type) {
    case "prod":
      return BASE_URL_PROD;
    case "dispatcher":
      return BASE_URL_DISPATCHER;
    case "eu":
      return BASE_URL_EU;
    case "universal":
      return BASE_URL_UNIVERSAL;
    case "medlog":
      return BASE_URL_MEDLOG;
    default:
      return BASE_URL_PROD;
  }
};

const handleUserCredentials = (type: PATH_URL) => {
  switch (type) {
    case "eu":
      return {
        username: "swostika@portpro.io",
        password: "Portpro@123-E",
      };
    case "universal":
      return {
        username: "swostika+t4@portpro.io",
        password: "Orderful@123",
      };
    case "medlog":
      return {
        username: "swostika+app@portpro.io",
        password: "Portpro@123",
      };
    default:
      return {
        username: "shishir+pt7@portpro.io",
        password: "TestTEST@12345",
      };
  }
};

export const TEST_URL = handleTestUrl(
  (process.env.TEST_URL as PATH_URL) || "prod"
);
export const USER_CREDENTIALS = handleUserCredentials(
  (process.env.TEST_URL as PATH_URL) || "prod"
);

export const LISTING_ROUTES = {
  LOGIN: TEST_URL + "/login",
  ONBOARDING: TEST_URL + "/onboarding",
  TMS_DISPATCHER: TEST_URL + "/tms/Dispatcher",
};
