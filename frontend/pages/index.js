import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import NftMinting from '@/components/NftMinting'

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT</title>
        <meta name="description" content="Random IPFS NFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.root}>

        <div className={styles.main}>
          Random IPFS NFT
        </div>
        <section className={styles.header}>
          <Header />
        </section>

        <section className={styles.description}>
          <NftMinting />
        </section>
      </main>
    </>
  )
}
