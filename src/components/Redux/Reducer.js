const initialState = {
    movies: [],
    favouriteMovies: [],
    deleteItem: ''
}

function reducer (state = initialState, action) {
    switch(action.type) {
        case 'SHOW_MOVIES':
            const movies = [ ...state.movies = action.payload.movieList ];
            return {...state,movies};
        case 'ADD_MOVIES':
            const favouriteMovies = [ ...state.favouriteMovies, action.payload.myFavouriteMovies ];
            return {...state,favouriteMovies};
        case 'DELETE_MOVIES':
            const id = action.payload.imdbID;
            return {...state,favouriteMovies: state.favouriteMovies.filter((item)=> item.imdbID !== id) };
        default:
          return state;
      }
}

export default reducer;