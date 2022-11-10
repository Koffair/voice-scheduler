import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Section = styled.section`
  background: white;
`

const SubPageLayout = ({ children }) => {
  return (
    <Section>
      <Link href="/" legacyBehavior>Vissza</Link>
      <br />
      {children}
    </Section>
  )
}

export default SubPageLayout