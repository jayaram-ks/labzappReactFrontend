import { createContext } from "react";
export const AuthContext = createContext({
  loggedin: false,
  setLoggedin: () => {},
  apiTokenz: "",
  setAPIToken: () => {},
  authTokenz: "",
  SetAuthToken: () => {},
});
