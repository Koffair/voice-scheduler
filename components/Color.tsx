import React from 'react'

const Color = ({ useText }) => {
  const text = useText()
  return (
    <div>{text}</div>
  )
}

export default Color
