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
      </Head>
      <body>{children}</body>
    </html>
  );
}
