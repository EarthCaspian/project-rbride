import React from 'react'
import { useSelector } from 'react-redux'
import "./LoadingOverlay.css"


type Props = {}

const LoadingOverlay = (props: Props) => {

    const loadingState = useSelector((state:any) => state.loading)

  return (
    <>
    {loadingState.requestCount > 0 && <div className="overlay">
    <div className="overlay__inner">
        <div className="overlay__content"><span className="spinner"></span></div>
    </div>
    </div>}
    </>
  )
}

export default LoadingOverlay