
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [cookies] = useCookies(['user']);
  const [movie, setMovie] = useState({});
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${id}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchMovie();
    fetchComments();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const email = cookies.user;

    if (!email) {
      alert('Inicia sesión para comentar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, email }),
      });
      const newComment = await response.json();
      setComments([...comments, newComment.comment]);
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const email = cookies.user;

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        alert('No tienes permiso para eliminar este comentario');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details-box">
        <div className="movie-info">
          <img src={movie.image} alt={`${movie.title} poster`} />
          <div className="movie-info-details">
            <h1>{movie.title}</h1>
            <p>{movie.synopsis}</p>
            <p>Director: {movie.director}</p>
            <p>Year: {movie.year}</p>
            <p>Duration: {movie.duration}</p>
            <p>Genre: {movie.genre}</p>
            <p>Price: ${movie.price}</p>
          </div>
        </div>
        <div className="movie-comments">
          <h2>Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.name}: {comment.comment}</p>
              <p>{comment.date}</p>
              {comment.email === cookies.user && (
                <button onClick={() => handleCommentDelete(comment.id)}>Eliminar</button>
              )}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add your comment..."
              required
            />
            <button type="submit" className="submit-comment">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
