// Takes in a token. If token exists, then it will add it to the headers, else it will delete it from headers
// The reason for doing this is that we would send the token with every requests if it exists,
// instead of picking and chosing which request to send it with.
import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
