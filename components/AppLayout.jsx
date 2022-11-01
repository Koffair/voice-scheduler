import React from 'react'
import styles from "../styles/homepage.module.css"
import Image from 'next/image'
import Link from 'next/link'

const AppLayout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" legacyBehavior>
          <Image src="/koffair-logo.png" alt="Koffair logo" width={397/2} height={74/2} />
        </Link>
      </header>
      <main className={styles.wrap}>{children}</main>
    </>
  )
}

export default AppLayout