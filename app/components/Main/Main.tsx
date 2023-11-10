import React from "react";
import { ImageObject } from "../../page";
import styles from "./Main.module.css";

const Main = ({ version, art }: { version: string; art?: ImageObject[] }) => {
  return (
    <main className={styles.header}>
      <section className={styles.container}>
        <h4>go build something awesome</h4>
        <p>now on Next.js v{version}</p>
        <img
          src="https://c.tenor.com/bCfpwMjfAi0AAAAC/cat-typing.gif"
          alt="cat typing"
        />
      </section>
      <section className={styles.container}>
        <h4>a little something fetched using RSC</h4>
        <div className={styles.gallery}>
          {art?.map(
            ({
              primaryImage,
              primaryImageSmall,
              title,
              artistDisplayName,
              objectID,
            }) => (
              <div key={objectID}>
                <img src={primaryImageSmall || primaryImage} alt={title} />
                <p>
                  {title} by {artistDisplayName}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
