import React, { useEffect, useState } from 'react';
import "./style.css";
import Card from './Card';
import Utsav from './Utsav.png';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3";

const categories = ["Home", "Popular", "Upcoming", "Latest", "Top-Rated"];
const genres = ["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Animation", "Romance"];

const Main = () => {
    const [movieData, setData] = useState([]);
    const [urlSet, setUrl] = useState(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(urlSet)
            .then(res => res.json())
            .then(data => setData(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, [urlSet]);

    const getData = (movieType) => {
        let url = "";
        const currentYear = new Date().getFullYear();

        switch (movieType) {
            case "Popular":
                url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Upcoming":
                url = `${BASE_URL}/discover/movie?primary_release_year=${currentYear + 1}&api_key=${API_KEY}`;
                break;
            case "Latest":
                url = `${BASE_URL}/discover/movie?primary_release_year=${currentYear}&api_key=${API_KEY}`;
                break;
            case "Top-Rated":
                url = `${BASE_URL}/discover/movie?sort_by=vote_average.desc&api_key=${API_KEY}`;
                break;
            case "Home":
                url = `${BASE_URL}/discover/movie?primary_release_year=2009&api_key=${API_KEY}`;
                break;
            default:
                url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
        }
        setUrl(url);
    }

    const getData2 = (genre) => {
        let url = "";

        switch (genre) {
            case "Action":
                url = `${BASE_URL}/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Adventure":
                url = `${BASE_URL}/discover/movie?with_genres=12&sort_by=popularity.desc&primary_release_year=2020&api_key=${API_KEY}`;
                break;
            case "Comedy":
                url = `${BASE_URL}/discover/movie?with_genres=35&sort_by=popularity.desc&primary_release_year=2019&api_key=${API_KEY}`;
                break;
            case "Crime":
                url = `${BASE_URL}/discover/movie?with_genres=80&sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Drama":
                url = `${BASE_URL}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Animation":
                url = `${BASE_URL}/discover/movie?with_genres=16&sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Romance":
                url = `${BASE_URL}/discover/movie?with_genres=10749&sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
            case "Documentary":
                url = `${BASE_URL}/discover/movie?with_genres=99&sort_by=popularity.desc&primary_release_year=2023&api_key=${API_KEY}`;
                break;
            default:
                url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
                break;
        }
        setUrl(url);
    }

    const searchMovie = (event) => {
        if (event.key === 'Enter') {
            const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`;
            setUrl(url);
            setSearch("");
        }
    }

    return (
        <>
            <div className="header">
                <img src={Utsav} alt="logo" id="logo" />
                <nav>
                    <ul>
                        {categories.map((value) => (
                            <li key={value}><a name={value} onClick={(e) => { getData(e.target.name) }} href="#container">{value}</a></li>
                        ))}
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input
                            type="text"
                            placeholder="Search Movies"
                            className="inputText"
                            onChange={(e) => { setSearch(e.target.value) }}
                            value={search}
                            onKeyDown={searchMovie}
                        />
                        <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>
            <div className="carousel-container">
                <div className="carousel">
                    <h1>Best viewing experience with Utsav</h1>
                    <p>Utsav is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With Utsav, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
                </div>
            </div>
            <div className='genre'>
                <h1>Our Genres:</h1>
                <nav>
                    <ul>
                        {genres.map((value) => (
                            <li key={value}><a name={value} href="#container" onClick={(e) => { getData2(e.target.name) }}>{value}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="container" id="container">
                {movieData.length === 0 ? <p className="notfound">Not Found</p> : movieData.map((res, pos) => (
                    <Card info={res} key={pos} />
                ))}
            </div>
        </>
    );
}

export default Main;
