function Navbar({onLogout, goToWishlist, goToGames}) {
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
    
    return (
        <div style={navbarStyle}>
          <button onClick={onLogout} style={buttonStyle}>Logout</button>

          {location.pathname === '/games' && (
            <button style={buttonStyle} onClick={goToWishlist}>Wishlist</button>
          )}

          {location.pathname === '/wishlist' && (
            <button style={buttonStyle} onClick={goToGames}>Back to Games</button>
          )}
        </div>
    )
};


export default Navbar;