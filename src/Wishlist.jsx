import { useState, useEffect } from 'react';
import './Wishlist.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [notes, setNotes] = useState({});
  const [notesLoaded, setNotesLoaded] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) return;
  
    const storedWishlist = localStorage.getItem(`wishlist_${userEmail}`);
    const storedNotes = localStorage.getItem(`notes_${userEmail}`);
  
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      console.log("Notes loaded:", parsedNotes);
    }

    setNotesLoaded(true);
  }, [userEmail]);

  useEffect(() => {
    if (notesLoaded) {
        localStorage.setItem(`notes_${userEmail}`, JSON.stringify(notes));
        console.log("Notes saved:", notes);
    }
  }, [notes, notesLoaded, userEmail]);

  const removeFromWishlist = (gameId) => {
    const updatedWishlist = wishlist.filter(game => game.id !== gameId);
    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updatedWishlist));

    const updatedNotes = { ...notes };
    delete updatedNotes[gameId];
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${userEmail}`, JSON.stringify(updatedNotes));
  };

  if (!notesLoaded) return <p>Loading wishlist...</p>

  return (
    <>
    <h2>My Wishlist</h2>
      <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <p>No games yet!</p>
      ) : (
        notesLoaded && wishlist.map(game => (
            <div key={game.id} className="game-wrapper">
              <div className="gameCard">
                <img src={game.background_image} alt={game.name} />
                <h4>{game.name}</h4>
                <p>Released: {game.released}</p>
                <p>Rating: {game.rating}</p>
                <p>Platforms: {game.platforms.join(', ')}</p>
                <button className='button' onClick={() => removeFromWishlist(game.id)}>Remove</button>
              </div>
              <div className='note-pad'>
                <form onSubmit={(e) => preventDefault()}>
                  <textarea
                    className='note-textarea'
                    placeholder='Add your notes here...'
                    value={notes[game.id] || ''}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [game.id]: e.target.value }))
                    }
                  />
                  <button
                    type='button'
                    onClick={() => 
                        setNotes((prev) => {const updated = {...prev}; 
                        delete updated[game.id];
                        return updated;
                    })}
                  >Clear</button>
                </form>
              </div>
            </div>
          ))
      )}
    </div>
    </>
  );
}

export default Wishlist;