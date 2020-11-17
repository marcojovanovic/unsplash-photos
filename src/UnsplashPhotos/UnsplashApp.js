import React, { useState, useEffect } from 'react';
import Input from './Input';
import Photo from './Photo';


import './photos.css';

function UnsplashApp() {
  const [page, setPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPhotos();
  }, [page]);

  useEffect(() => {
    let event = window.addEventListener('scroll', (e) => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => window.removeEventListener('scroll', event);
  }, []);

  const getPhotos = async () => {
    setLoading(true);

    let urlScrool = `https://api.unsplash.com/photos/?page=${page}&&client_id=WWAWHaDBUkqNDGQaaXh0JXjoX34k567pJtd15hT5OY0`;

    let searchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&&client_id=WWAWHaDBUkqNDGQaaXh0JXjoX34k567pJtd15hT5OY0`;


    if (query.length > 0) {
      const res = await fetch(searchUrl);

      const data = await res.json();

      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data.results];
      });

    } else {
      const res = await fetch(urlScrool);

      const data = await res.json();

      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data];
      });
    }

    setLoading(false);
  };

  const handleQuery = async (e) => {
    e.preventDefault();

    let searchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&&client_id=WWAWHaDBUkqNDGQaaXh0JXjoX34k567pJtd15hT5OY0`;

    const res = await fetch(searchUrl);

    const data = await res.json();

    setPhotos((oldPhotos) => {
      return [...oldPhotos, ...data.results];
    });


    
  };

  return (
    <>
      <div className="container">
        <Input setQuery={setQuery} handleQuery={handleQuery} />

        {!loading ? (
          <div className="photos-container">
            {photos.map((item) => {
              return (
                <div>
                  <Photo key={item.id} {...item} />
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className="loading">Loading ...</h2>
        )}
      </div>
    </>
  );
}

export default UnsplashApp;
