import React from 'react'
import './Loader.css'

function Loader() {
  return (
    <div className="loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" r="30" stroke="#d3ebfc" strokeWidth="9" fill="none"></circle>
        <circle cx="50" cy="50" r="30" stroke="#70c0f6" strokeWidth="9" strokeLinecap="square" fill="none">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="3.3333333333333335s" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1"></animateTransform>
            <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="3.3333333333333335s" values="37.69911184307752 150.79644737231007;94.2477796076938 94.24777960769377;37.69911184307752 150.79644737231007" keyTimes="0;0.5;1"></animate>
        </circle>
        </svg>
    </div>
  )
}

export default Loader