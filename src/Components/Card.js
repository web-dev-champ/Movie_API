import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = (movie) => {
  let img_path = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.info.id}`);
  };

  return (
    <div className='card' onClick={handleClick}>
      <img src={img_path + movie.info.poster_path} className='card-img' alt='movie-poster' />
      <div className='card-body'>
        <h4 className='name'>{movie.info.title}</h4>
        <p className='rating'><i className="fa-solid fa-star"> {movie.info.vote_average}</i></p>
        <h1 className='overview'>Overview</h1>
        <h6 className='des'>{movie.info.overview}</h6>
      </div>
    </div>
  );
};

export default Card;
