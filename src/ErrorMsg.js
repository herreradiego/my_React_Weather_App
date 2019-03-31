import React from 'react'

const ErroMsg = (props) =>{
    return(
      <React.Fragment>  
        <h1> Something does not work well... :(</h1>
        <h6>Error Message:{props.msg}</h6>
        </React.Fragment>
    )
  }

export default ErroMsg