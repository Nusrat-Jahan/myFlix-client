import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USERS, SET_FAVORITEMOVIES, SET_PROFILE } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      console.log('set_filter reducer triggered');
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('set_movies reducer triggered');
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USERS:
      console.log('set_users reducer triggered');
      return action.value;
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      console.log('set_favoriteMovies reducer triggered');
      return action.value;
    default:
      return state;
  }
}

function setProfile(state = '', action) {
  switch (action.type) {
    case SET_PROFILE:
      console.log('set_profile reducer triggered');
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies,
  setProfile,
})

export default moviesApp;