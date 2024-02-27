import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const fourOhFour = (props: Props) => {
  return (
    <div className="text-center" style={{ marginTop:200 }}>
          <h3>Oops, something went wrong, let's go back.</h3>
          <Link to="/">Go Back!</Link>
          </div>
  )
}

export default fourOhFour;