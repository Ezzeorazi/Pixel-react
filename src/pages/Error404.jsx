import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error404 = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      <h2>Error 404...</h2>


    </div>
  )
}

export default Error404