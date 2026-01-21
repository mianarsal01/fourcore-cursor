export default function HelpPage() {
  return (
    <s-page heading="Help">
      <s-section>
        <div className="fc-help-header">
          <h2>We are here to help</h2>
          <p>
            Need help or have questions? Email us at{" "}
            <s-link href="mailto:mianarsal01@gmail.com">
              mianarsal01@gmail.com
            </s-link>
            .
          </p>
        </div>
      </s-section>
      <s-section>
        <div className="fc-help">
          <details>
            <summary>How do I upload a custom cursor?</summary>
            <p>
              Go to the "Upload your own" tab, paste your PNG URLs (default and
              hover), and click "Save to library". Then select it and click
              "Save & Publish".
            </p>
          </details>
          <details>
            <summary>How does this app help my store?</summary>
            <p>
              Custom cursors add a branded micro‑interaction that makes your
              storefront feel more unique and engaging.
            </p>
          </details>
          <details>
            <summary>Does this app affect page speed?</summary>
            <p>
              The app uses native CSS cursors, so impact is minimal. Cursor
              assets are lightweight and cached by the browser.
            </p>
          </details>
        </div>
      </s-section>
      <style>{`
        .fc-help-header {
          max-width: 720px;
          display: grid;
          gap: 0.4rem;
          margin-bottom: 0.6rem;
        }
        .fc-help-header h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        .fc-help-header p {
          margin: 0;
          color: #475569;
        }
        .fc-help {
          display: grid;
          gap: 0.75rem;
          max-width: 720px;
        }
        .fc-help details {
          border: 1px solid #e2e8f0;
          border-radius: 0.8rem;
          padding: 0.6rem 0.9rem;
          background: #ffffff;
        }
        .fc-help summary {
          font-weight: 600;
          cursor: pointer;
        }
        .fc-help p {
          margin: 0.6rem 0 0;
          color: #475569;
        }
      `}</style>
    </s-page>
  );
}
