import {useLocation} from 'react-router-dom';

function Navbar({onLogout, goToWishlist, goToGames, sortOption, setSortOption, genreFilter, setGenreFilter}) {
  const location = useLocation();
    const navbarStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 20px',
      backgroudColor: '#1e1e1e',
      color: '#fff',
      fontWeight: 'bold',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    };

    const buttonStyle = {
      backgroundColor: '#fff',
      color: '#1e1e1e',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
    };

    const dropDownStyle = {
      padding: '6px',
      marginLeft: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontWeight: 'bold',
      fontFamily: 'inherit',
    };
    
    return (
        <div style={navbarStyle}>
          {location.pathname === '/games' && (
            <div>
              <label htmlFor='genre'>Genre</label>
              <select 
                id='genre' 
                style={dropDownStyle}
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
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
                style={dropDownStyle}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value=''>Default</option>
                <option value='name'>Title A-Z</option>
                <option value='-name'>Title Z-A</option>
                <option value='-rating'>Rating High-Low</option>
                <option value='rating'>Rating Low-High</option>
              </select>
            </div>
          )}
          <div>
            <button onClick={onLogout} style={buttonStyle}>Logout</button>

            {location.pathname === '/games' && (
              <button style={buttonStyle} onClick={goToWishlist}>Wishlist</button>
            )}

            {location.pathname === '/wishlist' && (
              <button style={buttonStyle} onClick={goToGames}>Back to Games</button>
            )}
          </div>
        </div>
    )
};


export default Navbar;