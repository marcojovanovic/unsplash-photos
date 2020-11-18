import React from 'react';
import {FaSearch} from 'react-icons/fa'

function Input({setQuery, handleQuery,}) {
  return (
    <div>
      <form className="input-container" onSubmit={handleQuery}>
        <input 
        type="text" 
        className="input"
        onChange={(e)=> setQuery(e.target.value)}
        />
        <button type="submit" className="btn">
        <h2><FaSearch /></h2>
        </button>
      </form>
    </div>
  );
}

export default Input;
