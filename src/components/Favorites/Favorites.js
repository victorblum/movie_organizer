import React, { Component } from 'react';
import store from '../Redux/Store';
import './Favorites.css';

//ВАЖНО
// уже в списке проверка
// кнопка не активна - disabled !movie
// дизайн страницы - высоту задать
// презентация - что такое реакт и по всем компонентам

//НЕ ВАЖНО
// менять кнопку на добавлено
// короткое описание фильма
// выплывающее окно отлов ошибок
// выплывающее окно не найденных фильмов
// Action.js

export default class Favorites extends Component {
    state = {
        searchLine: '',
        movies: [],
        listId: '',
        showButton: 'block',
        showLink: 'none'
    };

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            this.setState({ 
                movies: state.favouriteMovies
            })
        })
    };

    deleteFromFavorites = (item) => {
        store.dispatch({
            type: 'DELETE_MOVIES',
            payload: {
                imdbID: item
            }
        })
    };

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    };

    favoritesSubmitHandler = (e) => {
        e.preventDefault();
        const favoritesInfo = {
            "title": this.state.searchLine,
            "movies": this.state.movies.map((item) => {
                return item.imdbID})
        };
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify(favoritesInfo)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ 
                listId: `http://localhost:3000/list/${data.id}`, 
                showButton: 'none',
                showLink: 'inline-block'
            });
        })
        .catch((err) => console.log(err));
    };
 
    render() { 
        const { searchLine, listId, showButton, showLink } = this.state;

        return (
            <div className="favorites">
                <form className="favorites__form" onSubmit={this.favoritesSubmitHandler}>
                <h1 className="favorites__title">
                    Favorites
                </h1>
                    <input
                        value={searchLine}
                        type="text"
                        className="favorites__name" 
                        placeholder="Enter the name of the list"
                        onChange={this.searchLineChangeHandler}
                    />
                    <ul className="favorites__list">
                        {this.state.movies.map((item) => {
                            return <li key={item.imdbID}>{item.Title} ({item.Year})
                                <span>
                                    <button 
                                    key={item.imdbID} 
                                    type="button" 
                                    className="favorites__delete" 
                                    onClick={() => this.deleteFromFavorites(item.imdbID)}
                                >
                                    &#10008;
                                    </button>
                                </span>
                            </li>;
                        })}
                    </ul>
                    <button 
                        type="submit" 
                        className="favorites__save" 
                        disabled={!searchLine}
                        style={{ display: showButton }}
                    >
                        Save list
                    </button>
                    <a style={{ display: showLink }} className="favoritesLink" href={listId}>Go to the list</a>
                </form>
            </div>
        );
    }
}
 
