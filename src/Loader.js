import React from 'react'
import imgLoader from './gifCat.gif'
const Loader = ()=>{
    return (
      <React.Fragment>
        <h1>LOADING...</h1>
        <img className='loader' src={imgLoader}/>
      </React.Fragment>
    )
  }

export default Loader