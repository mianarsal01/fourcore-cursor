import styles from "./privacy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.privacyPage}>
      <div className={styles.privacyShell}>
        <section className={styles.privacyCard}>
          <div className={styles.privacyHeader}>
            <span className={styles.eyebrow}>FourCore Apps</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.subtitle}>
              This policy explains how FourCore Apps collects, uses, and shares
              data when you install and use FourCore Custom Cursor.
            </p>
            <p className={styles.meta}>Last updated: February 3, 2026</p>
          </div>
        </section>

        <section className={styles.privacyCard}>
          <div className={styles.sectionGrid}>
            <div className={styles.section}>
              <h2>What data we collect</h2>
              <p>
                We only collect the data needed to run the app and provide the
                requested features.
              </p>
              <ul>
                <li>Your Shopify store domain and app installation details.</li>
                <li>
                  Cursor configuration data you save in the app (selected preset,
                  sizes, and colors).
                </li>
                <li>
                  Optional custom cursor image URLs you provide for your saved
                  cursors.
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>How we use your data</h2>
              <ul>
                <li>To display and save your cursor settings.</li>
                <li>To publish cursor settings to your storefront.</li>
                <li>To provide support and troubleshoot issues.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Data sharing</h2>
              <p>
                We do not sell personal data. We only share data with Shopify and
                service providers required to operate the app (hosting, database,
                and analytics strictly for app performance).
              </p>
            </div>

            <div className={styles.section}>
              <h2>Data retention</h2>
              <p>
                We keep app data only as long as your store has the app
                installed. When you uninstall the app, we remove associated app
                data within a reasonable period unless we are legally required to
                keep it.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Your rights</h2>
              <p>
                You can request access, correction, or deletion of your app data
                by contacting us. We will respond within a reasonable timeframe.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Contact</h2>
              <p>
                For privacy questions or requests, email us at{" "}
                <a className={styles.contact} href="mailto:mianarsal01@gmail.com">
                  mianarsal01@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
