import type { LoaderFunctionArgs } from "react-router";
import { redirect, Form, useLoaderData } from "react-router";

import { login } from "../../shopify.server";

import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div>
            <p className={styles.kicker}>FourCore Cursor</p>
            <h1 className={styles.heading}>
              Custom cursors that turn browsing into a branded moment.
            </h1>
            <p className={styles.text}>
              Launch a cursor experience in minutes. No code, just presets and
              instant preview.
            </p>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroPreview}>
              <span />
              <span />
            </div>
            <div className={styles.heroCopy}>
              <strong>Live cursor preview</strong>
              <p>Design, publish, and tweak anytime.</p>
            </div>
          </div>
        </div>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Enter the studio
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Preset library</strong>. Start from polished cursor styles
            and customize every detail.
          </li>
          <li>
            <strong>Saved cursors</strong>. Keep your favorites ready to reuse
            anytime.
          </li>
          <li>
            <strong>Lightweight embed</strong>. Uses native CSS cursors to
            minimize page impact.
          </li>
        </ul>
      </div>
    </div>
  );
}
