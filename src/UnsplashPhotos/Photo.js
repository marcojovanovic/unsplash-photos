import React from 'react'




function Photo({likes, urls:{regular}, user:{name, portfolio_url, profile_image:{medium}}}) {
  return (
    <>
    <div className='photo-relative'>
      <img src={regular} className='unsplash-image'  alt='' />

      <div className='user-content'>
        <div>
        <h4>{name}</h4>
        <h4>{likes} likes</h4>
        </div>
        <div>
          <a href={portfolio_url}>
           <img src={medium} />
          </a>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Photo
