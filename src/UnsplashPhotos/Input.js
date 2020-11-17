import React from 'react';

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
          Search
        </button>
      </form>
    </div>
  );
}

export default Input;
