import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    /**
     * This function handles the mounting of the component and performs a series of asynchronous tasks,
     * including refreshing the authentication token using axios.
     * It then checks the user's authentication status and redirects the user to different pages based on their status.
     */
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if the user is logged in, the following code will run
        if (userAuthStatus === 'loggedIn') {
          history.push('/feed');
        }
      } catch (err) {
        // if the user is not logged in, the following code will run
        if (userAuthStatus === 'loggedOut') {
          history.push('/discover');
        }
      }
    }

    handleMount();
  }, [history, userAuthStatus]);
};