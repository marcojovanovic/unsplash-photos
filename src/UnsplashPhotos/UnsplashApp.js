import React, { useState, useEffect } from 'react';
import Input from './Input';
import Photo from './Photo';


import './photos.css';

let secretKey = `?client_id=${process.env.REACT_APP_SECRET_KEY}`

let mainUrl = `https://api.unsplash.com/photos/`
let searchUrl = `https://api.unsplash.com/search/photos/`

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
    let url;

    if (query.length > 0) {
      url = `${searchUrl}${secretKey}&&page=${page}&query=${query}`;
    } else {
      url = `${mainUrl}${secretKey}&&page=${page}`;
    }

    try {
      const res = await fetch(url);

      const data = await res.json();

      setPhotos((oldPhotos) => {
        if (query.length > 0) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });

      setLoading(false);
    } catch(err){
        console.log(err)
        setLoading(false)

    }
  };
    const handleQuery = async (e) => {
      e.preventDefault();

      let findUrl = `${searchUrl}${secretKey}&&page=${page}&query=${query}`;

      const res = await fetch(findUrl);

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
