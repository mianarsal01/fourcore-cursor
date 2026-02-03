export default function HelpPage() {
  return (
    <s-page heading="Help & Support" inlineSize="large">
      <div className="fc-help-shell">
        <div className="fc-help-card">
          <div className="fc-help-header">
            <h2>We&apos;re here to help</h2>
            <p>
              If you have any questions or need assistance, please don&apos;t
              hesitate to email us at{" "}
              <s-link href="mailto:mianarsal01@gmail.com">
                mianarsal01@gmail.com
              </s-link>
              .
            </p>
          </div>
        </div>

        <div className="fc-help-card">
          <div className="fc-help">
            <h3>Getting Started</h3>
            <details>
              <summary>How to activate the custom cursor</summary>
              <div className="fc-help-step">
                <p>
                  To see your custom cursor on your storefront, you need to
                  enable the app embed in your theme editor.
                </p>
                <ol>
                  <li>
                    Go to the{" "}
                    <a
                      href="/admin/themes/current/editor?section=apps"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Theme Editor
                    </a>
                    .
                  </li>
                  <li>
                    In the left sidebar, look for the &quot;App embeds&quot;
                    section.
                  </li>
                  <li>
                    Find &quot;FourCore Custom Cursor&quot; in the list of app embeds
                    and make sure the toggle is switched on.
                  </li>
                  <li>Click &quot;Save&quot; in the top right corner.</li>
                </ol>
                <a
                  href="/admin/themes/current/editor?section=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fc-primary-button"
                >
                  Go to Theme Editor
                </a>
              </div>
            </details>

            <h3>Customization</h3>
            <details>
              <summary>How do I upload a custom cursor?</summary>
              <p>
                You can use your own cursor images by following these steps:
              </p>
              <ol>
                <li>
                  First, upload your cursor images to Shopify. You can do this
                  by going to &quot;Content&quot; &gt; &quot;Files&quot; in your
                  Shopify admin and uploading your images there. We recommend
                  using PNG images with a transparent background, around 32x32
                  pixels.
                </li>
                <li>Once uploaded, copy the URL of each image.</li>
                <li>
                  In the FourCore Custom Cursor app, go to the &quot;Upload your
                  own&quot; tab.
                </li>
                <li>
                  Paste the URLs for your &quot;default&quot; and
                  &quot;hover&quot; cursor images into the corresponding
                  fields.
                </li>
                <li>
                  Give your cursor a name and click &quot;Save to library&quot;.
                </li>
                <li>
                  Your saved cursor will now appear in the &quot;Saved
                  cursors&quot; tab. Select it and click &quot;Save &amp;
                  Publish&quot; to apply it to your store.
                </li>
              </ol>
            </details>

            <h3>Troubleshooting</h3>
            <details>
              <summary>The custom cursor is not showing up.</summary>
              <p>
                If the cursor isn&apos;t appearing, please check the following:
              </p>
              <ul>
                <li>
                  Make sure you have enabled the &quot;FourCore Custom Cursor&quot; app
                  embed in your theme editor, as described in the &quot;Getting
                  Started&quot; section.
                </li>
                <li>
                  Ensure the &quot;Enable custom cursor&quot; checkbox is
                  checked in the app&apos;s settings.
                </li>
                <li>
                  Custom cursors are disabled on mobile by design. Please test
                  on a desktop device.
                </li>
                <li>
                  Clear your browser cache, or try viewing your store in an
                  incognito/private browser window.
                </li>
              </ul>
            </details>
            <details>
              <summary>The cursor looks blurry or too small.</summary>
              <p>
                For best results, we recommend using cursor images that are
                32x32 pixels. If your image is a different size, the browser may
                try to scale it, which can cause it to look blurry. You can
                adjust the &quot;Default cursor size&quot; and
                &quot;Hover cursor size&quot;
                settings in the app to fine-tune the appearance.
              </p>
            </details>
          </div>
        </div>
      </div>
      <style>{`
        .fc-help-shell {
          font-family: "Manrope", "Segoe UI", sans-serif;
          color: #0b1220;
          width: 100%;
          max-width: none;
          margin: 0;
          background: radial-gradient(
              circle at 10% 8%,
              rgba(236, 72, 153, 0.2),
              transparent 38%
            ),
            radial-gradient(
              circle at 85% 12%,
              rgba(59, 130, 246, 0.22),
              transparent 40%
            ),
            radial-gradient(
              circle at 30% 80%,
              rgba(34, 211, 238, 0.2),
              transparent 45%
            ),
            radial-gradient(
              circle at 90% 78%,
              rgba(250, 204, 21, 0.18),
              transparent 48%
            ),
            linear-gradient(135deg, #fdf2f8 0%, #eef2ff 45%, #f0f9ff 100%);
          border-radius: 1.6rem;
          padding: 1.5rem 1.6rem 2rem;
          box-sizing: border-box;
          display: grid;
          gap: 1.4rem;
        }
        .fc-help-shell * {
          box-sizing: border-box;
        }
        .fc-help-card {
          border: 1px solid rgba(148, 163, 184, 0.35);
          border-radius: 1.35rem;
          background: rgba(255, 255, 255, 0.92);
          padding: 1.25rem 1.35rem;
          box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
        }
        .fc-help-header {
          display: grid;
          gap: 0.5rem;
        }
        .fc-help-header h2 {
          margin: 0;
          font-size: 1.15rem;
        }
        .fc-help-header p {
          margin: 0;
          color: #475569;
        }
        .fc-help {
          display: grid;
          gap: 1.5rem;
        }
        .fc-help h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .fc-help details {
          border: 1px solid rgba(148, 163, 184, 0.35);
          border-radius: 0.95rem;
          padding: 0.6rem 0.8rem 0.9rem;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.7);
        }
        .fc-help summary {
          font-weight: 600;
          cursor: pointer;
          list-style: none;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #0f172a;
          padding: 0.4rem 0.2rem;
        }
        .fc-help summary::-webkit-details-marker {
          display: none;
        }
        .fc-help summary::before {
          content: "▸";
          font-size: 0.9rem;
          color: #2563eb;
          transition: transform 0.2s ease;
        }
        .fc-help details[open] summary::before {
          transform: rotate(90deg);
        }
        .fc-help details[open] summary {
          color: #2563eb;
        }
        .fc-help p, .fc-help ul, .fc-help ol {
          margin: 0.8rem 0 0;
          color: #475569;
          line-height: 1.5;
        }
        .fc-help-step {
          display: grid;
          gap: 1rem;
        }
        .fc-primary-button {
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border: none;
          padding: 0.7rem 1.1rem;
          border-radius: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          justify-self: start;
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.25);
        }
        .fc-primary-button:hover {
          background-color: #1d4ed8;
        }
        @media (max-width: 760px) {
          .fc-help-shell {
            padding: 1.2rem 1.1rem 1.6rem;
          }
        }
      `}</style>
    </s-page>
  );
}
