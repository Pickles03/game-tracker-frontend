import {useState, useEffect} from 'react'; 
import {useLocation} from 'react-router-dom';
import './Navbar.css'; 

function Navbar({onLogout, goToWishlist, goToGames, sortOption, setSortOption, genreFilter, setGenreFilter}) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [hovered, setHovered] = useState(false);
  
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    startAutoHide();
  };

  const startAutoHide = () => {
    if (!hovered) {
      setTimeout(() => {
        if (!hovered) {
          setShowNavbar(false);
        }
      }, 6000);
    }
  };

  useEffect(() => {
    let timeout;

    setShowNavbar(true);
    timeout = setTimeout(() => {
      if (!hovered) setShowNavbar(false);
    }, 4000);

    const handleMouseMove = (e) => {
      if (e.clientY < 50) {
        setShowNavbar(true);
        startAutoHide();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hovered]);

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${showNavbar ? 'visible' : 'hidden'}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className='navbar-content'>
        {location.pathname === '/games' && (
          <div className='dropdowns'>
            <label htmlFor='genre'>Genre</label>
            <select 
              id='genre' 
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className='genre-select'
            >
              <option value=''>All</option>
              <option value='action'>Action</option>
              <option value='indie'>Indie</option>
              <option value='adventure'>Adventure</option>
              <option value='role-playing-games-rpg'>RPG</option>
              <option value='strategy'>Strategy</option>
              <option value='shooter'>Shooter</option>
              <option value='casual'>Casual</option>
              <option value='simulation'>Simulation</option>
              <option value='puzzle'>Puzzle</option>
              <option value='arcade'>Arcade</option>
              <option value='platformer'>Platformer</option>
              <option value='massively-multiplayer'>Multiplayer</option>
              <option value='racing'>Racing</option>
              <option value='sports'>Sports</option>
              <option value='fighting'>Fighting</option>
              <option value='family'>Family</option>
              <option value='board-games'>Board Games</option>
              <option value='card'>Card Games</option>
              <option value='educational'>Educational</option>
            </select>

            <label htmlFor='sort'>Sort by</label>
            <select 
              id='sort' 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className='sort-select'
            >
              <option value=''>Default</option>
              <option value='name'>Title A-Z</option>
              <option value='-name'>Title Z-A</option>
              <option value='-rating'>Rating High-Low</option>
              <option value='rating'>Rating Low-High</option>
            </select>
          </div>
        )}
        <div className='buttons'>
          <button onClick={onLogout} className='logout-btn'>Logout</button>

          {location.pathname === '/games' && (
            <button onClick={goToWishlist} className='wishlist-btn'>Wishlist</button>
          )}

          {location.pathname === '/wishlist' && (
            <button onClick={goToGames} className='back-to-games-btn'>Back to Games</button>
          )}
        </div>
      </div>
    </nav>
  )
};


export default Navbar;