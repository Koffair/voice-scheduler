import React from 'react'
import styles from "../styles/homepage.module.css"
import Image from 'next/image'

const AppLayout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Image src="/koffair-logo.png" alt="Koffair logo" width={397/2} height={74/2} />
      </header>
      <main className={styles.wrap}>{children}</main>
    </>
  )
}

export default AppLayout