import React from 'react'
import Header from '../Molecules/Header/Header'
import { labels } from '@/data/labels'
import Footer from '../Molecules/footer/Footer'
import styles from "@/styles/Home.module.scss";


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.main}>
            <Header
                title={labels.titlePageLabel}
            />
            {children}
            <Footer />
        </main>
    )
}

export default Layout