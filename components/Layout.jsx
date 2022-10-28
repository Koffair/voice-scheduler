import Link from 'next/link'
import React from 'react'
import styles from "../styles/homepage.module.css"

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">Vissza</Link>
      </header>
      <main className={styles.wrap}>{children}</main>
    </>
  )
}

export default Layout