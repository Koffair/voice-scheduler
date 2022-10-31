import React from 'react'
import Link from 'next/link'

const SubPageLayout = ({ children }) => {
  return (
    <section>
      <Link href="/" legacyBehavior>Vissza</Link>
      <br />
      {children}
    </section>
  )
}

export default SubPageLayout