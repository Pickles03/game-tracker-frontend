import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Wishlist from './Wishlist';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';
import Games from './mainApiComponents/Games';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [likedGames, setLikedGames] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      const userEmail = localStorage.getItem('userEmail');
      const storedLikes = localStorage.getItem(`likedGames-${userEmail}`);
      if (storedLikes) {
        setLikedGames(JSON.parse(storedLikes));
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/games');
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const switchToSignUp = () => {
    setSignedUp(true);
  };

  const switchToLogin = () => {
    setSignedUp(false);
  };

  const handleLikeGame = (game) => {
    const alreadyLiked = likedGames.some(likedGame => likedGame.id === game.id);
    if (!alreadyLiked) {
      const updatedLikedGames = [...likedGames, game];
      setLikedGames(updatedLikedGames);

      const userEmail = localStorage.getItem('userEmail');
      localStorage.setItem(`likedGames-${userEmail}`, JSON.stringify(updatedLikedGames));

      console.log(`Game liked: ${game.name}`);
    }
  };

  return (
    <>
      {isLoggedIn && 
        <Navbar 
          onLogout={handleLogOut}
          goToWishlist={() => navigate('/wishlist')}
          goToGames={() => navigate('/games')}
          sortOption={sortOption}
          setSortOption={setSortOption}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
      />}
         
      <h1>Welcome to the game tracker and wishlist creator</h1>

      <Routes>
        <Route path='/' element={isLoggedIn ? (<Navigate to='/games' />) : (!signedUp ? (<Login onLogin={handleLogin} switchToSignUp={switchToSignUp}/>) : (<SignUp switchToLogin={switchToLogin}/>))} />
        <Route path='/games' element={isLoggedIn ? (<Games onLikeGame={handleLikeGame} sortOption={sortOption} genreFilter={genreFilter}/>) : (<Navigate to='/' />)} />
        <Route  path='/wishlist' element={isLoggedIn ? (<Wishlist />) : (<Navigate to='/' />)} />
      </Routes>
    </>
  )
}

export default App;
