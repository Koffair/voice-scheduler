import React from 'react'
import styled from 'styled-components'

const ColoredSquare = styled.div`
  width: 100px;
  height: 100px;
  ${({ color }) => `background-color: ${color};`};
`

const Color = ({ color }) => {
  return (
    <ColoredSquare color={color} />
  )
}

export default Color
