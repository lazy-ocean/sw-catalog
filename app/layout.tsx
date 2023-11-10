import Head from "next/head";
import "./global.css";

export const metadata = {
  title: "Home",
  description: "SWAPI data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
