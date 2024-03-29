import Head from "next/head";
import styles from "../styles/Home.module.css";
const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";
const PLAYLIST_ID = "PLmmhgwbeGV3c3Eap2dLeX0KCvW-vEpa9B";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

// comment to test GitHub connection

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>JustinLexiAcro.Yoga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.siteTitle}>
          <h1 className={styles.title}>JustinLexiAcro.Yoga</h1>
        </div>

        <ul className={styles.grid}>
          {data.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                  target="_blank"
                  rel="norefer"
                >
                  <p>
                    {/* <img width={medium.width} height={medium.height} src={medium.url} alt="" /> */}
                    <img src={medium.url} alt="" />
                  </p>
                  <h3>{title}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
