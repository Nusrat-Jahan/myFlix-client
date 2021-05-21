export const SET_MOVIES = 'SET_MOVIES'; // Intializes movies property
export const SET_FILTER = 'SET_FILTER'; // Filter my movies list
export const SET_USERS = 'SET_USERS';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const SET_FAVORITEMOVIES = 'SET_FAVORITEMOVIES';

// set the movies
export function setMovies(value) {
  console.log('set_movies action triggered');
  return {
    type: SET_MOVIES,
    value
  };
}

// set movie filter
export function setFilter(value) {
  console.log('set_filter action triggered');
  return {
    type: SET_FILTER,
    value
  };
}

// set the user
export function setUsers(value) {
  console.log('set_users action triggered');
  return {
    type: SET_USERS,
    value
  };
}

export function updateProfile(value) {
  console.log('UPDATE_PROFILE action triggered');
  return {
    type: UPDATE_PROFILE,
    value
  };
}

// sets fav movies
export function setFavoriteMovies(value) {
  console.log('set_favoriteMovies action triggered');
  return {
    type: SET_FAVORITEMOVIES,
    value
  };
}