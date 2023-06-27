import React from 'react'
import './button.css'
const Button = ({text, className, onClick}) => {
  return (
    <button onClick={onClick} className={`btn ${className}`}>{text}</button>
  )
}


export default Button