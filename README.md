# myFlix-client
![MyFlix](https://i.postimg.cc/vZNrWpdv/Myflix-movielist.png)

## Project Description:

This project is a React application that allows users to sign up, log in and get information about movies, genres, and directors. It also allows user to update their account information, add movies in their list of favorites and remove movies from their list of favorites. This application uses an existing server-side REST API and MongoDB database.

## Essential views and Features:

* Login view: Displays a welcome screen where users can log in or register for a new account.
* Registration view: New user can Register through registration view.
* Main view: In the main view, users can see all movies. They can also search for movies. It allows user to see details about a single movie, genre, director and also have options to add movies to favorite.
  * Single movie view: View the specific movie details.
  * Genre view: View the genre of the movie and details about the genre.
  * Director view: View the director of the movie and details about the director.
* Profile view: Users can also view their profile where they can see their favorite movies, remove movies from their favorites, and edit their profile details.

## Technical requirements:

* The application must be a single-page application (SPA)
* The application must use state routing to navigate between views and share URLs
* The application must give users the option to filter movies
* The application must give users the option to sort movies
* The application must initially use Parcel as its build tool
* The application must be written using the React library and in ES2015+
* The application must be written with React Redux (hence respecting the Flux pattern)
* The application must use Bootstrap as a UI library for styling and responsiveness
* The application must contain a mix of class components and function components
* The application may be hosted online

## How to Run

To run this project locally, run the following command, then navigate to the localhost port stated in your terminal.

```
parcel src/index.html
```