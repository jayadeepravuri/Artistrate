import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResults) => accResults.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on
      // Update it's followers_count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // Update it's following_count
      {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : // This is not the profile the user clicked on or the profile of the logged in user
      // Return it unchanged
      profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on
      // Update it's followers_count
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // Update it's following_count
      {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : // This is not the profile the user clicked on or the profile of the logged in user
      // Return it unchanged
      profile;
}

/**
 * Sets the refresh token timestamp in the local storage based on the provided data.
 *
 * @param {object} data - The data containing the refresh token
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
}

/**
 * Checks if the refresh token needs to be refreshed.
 * Will refresh for a logged in user.
 *
 * @return {boolean} true if the refresh token needs to be refreshed, false otherwise
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp")
}

/**
 * Removes the "refreshTokenTimestamp" from the local storage.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp")
}