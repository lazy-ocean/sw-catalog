import Head from "next/head";
import "./global.css";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "SW catalogue",
  description: "Star Wars creatures catalogue",
};

const roboto = Roboto({
  weight: ["300"],
  subsets: ["latin"],
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body>
        {children}
        <footer>
          Made by <a href="https://github.com/lazy-ocean">Vladlena Panchenko</a>
        </footer>
      </body>
    </html>
  );
}
