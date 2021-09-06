import React, { Component } from 'react';
import store from '../Redux/Store';
import './Favorites.css';

//ВАЖНО
// кнопки менять местами
// кнопка не активна - disabled !movie
// уже в списке
// отлов ошибок
// презентация - что такое реакт и по всем компонентам

//НЕ ВАЖНО
// выплывающее окно отлов ошибок
// выплывающее окно не найденных фильмов
// дизайн страницы
// Action.js

export default class Favorites extends Component {
    state = {
        searchLine: '',
        movies: [],
        listId: ''
    }

    componentDidMount() {
    store.subscribe(() => {
        const state = store.getState();
        this.setState({ 
            movies: state.favouriteMovies
        });
    });
    }

    deleteFromFavorites = (item) => {
            store.dispatch({
            type: 'DELETE_MOVIES',
            payload: {
                imdbID: item
            }
        })
    }

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }

    favoritesSubmitHandler = (e) => {
        e.preventDefault();
        const favoritesInfo = {
            "title": this.state.searchLine,
            "movies": this.state.movies.map((item) => {
                return item.imdbID})
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify(favoritesInfo)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ listId: `http://localhost:3000/list/${data.id}` });
        })
    }
 
    render() { 
        const { searchLine, listId } = this.state;

        return (
            <div className="favorites">
                <form className="favorites__form" onSubmit={this.favoritesSubmitHandler}>
                    <input
                        value={searchLine}
                        type="text"
                        className="favorites__name" 
                        placeholder="Введите название списка"
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
                                    Х
                                    </button>
                                </span>
                            </li>;
                        })}
                    </ul>
                    <button 
                        type="submit" 
                        className="favorites__save" 
                        disabled={!searchLine}
                    >
                        Сохранить список
                    </button>
                    <a className="favoritesLink" href={listId}>Перейти к списку</a>
                </form>
            </div>
        );
    }
}
 
