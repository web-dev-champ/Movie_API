import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "db75be3f6da59e6c54d0b9f568d19d16";
const BASE_URL = "https://api.themoviedb.org/3";
const img_path = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));

    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setCast(data.cast));

    fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setReviews(data.results));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <img src={img_path + movie.poster_path} alt={movie.title} />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p>{movie.overview}</p>
        <h2>Cast</h2>
        <ul>
          {cast.map((member) => (
            <li key={member.cast_id}>{member.name} as {member.character}</li>
          ))}
        </ul>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p><strong>{review.author}:</strong> {review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
