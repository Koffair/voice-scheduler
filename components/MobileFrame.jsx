import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  width: 521px;
  height: 1061px;
`
const Frame = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`

const Content = styled.div`
  padding: 37px 35px;
  width: 100%;
  height: 100%;
`

const MobileFrame = ({ children, ...rest }) => {
  return (
    <Wrap {...rest}>
      <Content>
        {children}
      </Content>
      <Frame src={"/mobile-frame.png"} width={521} height={1061} />
    </Wrap>
  )
}

export default MobileFrame
