export default function HelpPage() {
  return (
    <s-page heading="Help & Support">
      <s-section>
        <div className="fc-help-header">
          <h2>We're here to help</h2>
          <p>
            If you have any questions or need assistance, please don't hesitate
            to email us at{" "}
            <s-link href="mailto:mianarsal01@gmail.com">
              mianarsal01@gmail.com
            </s-link>
            .
          </p>
        </div>
      </s-section>

      <s-section>
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
                  In the left sidebar, look for the "App embeds" section.
                </li>
                <li>
                  Find "FourCore Cursor" in the list of app embeds and make sure
                  the toggle is switched on.
                </li>
                <li>Click "Save" in the top right corner.</li>
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
                First, upload your cursor images to Shopify. You can do this by
                going to "Content" &gt; "Files" in your Shopify admin and
                uploading your images there. We recommend using PNG images with a
                transparent background, around 32x32 pixels.
              </li>
              <li>
                Once uploaded, copy the URL of each image.
              </li>
              <li>
                In the FourCore Cursor app, go to the "Upload your own" tab.
              </li>
              <li>
                Paste the URLs for your "default" and "hover" cursor images into
                the corresponding fields.
              </li>
              <li>
                Give your cursor a name and click "Save to library".
              </li>
              <li>
                Your saved cursor will now appear in the "Saved cursors" tab.
                Select it and click "Save & Publish" to apply it to your store.
              </li>
            </ol>
          </details>

          <h3>Troubleshooting</h3>
          <details>
            <summary>The custom cursor is not showing up.</summary>
            <p>
              If the cursor isn't appearing, please check the following:
            </p>
            <ul>
              <li>
                Make sure you have enabled the "FourCore Cursor" app embed in
                your theme editor, as described in the "Getting Started"
                section.
              </li>
              <li>
                Ensure the "Enable custom cursor" checkbox is checked in the
                app's settings.
              </li>
              <li>
                If you are on a mobile device, make sure "Disable on mobile" is
                not checked (or test on a desktop device).
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
              For best results, we recommend using cursor images that are 32x32
              pixels. If your image is a different size, the browser may try to
              scale it, which can cause it to look blurry. You can adjust the
              "Default cursor size" and "Hover cursor size" settings in the app
              to fine-tune the appearance.
            </p>
          </details>
        </div>
      </s-section>
      <style>{`
        .fc-help-header {
          max-width: 720px;
          display: grid;
          gap: 0.4rem;
          margin-bottom: 2rem;
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
          gap: 1.5rem;
          max-width: 720px;
        }
        .fc-help h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
        .fc-help details {
          border: 1px solid #e2e8f0;
          border-radius: 0.8rem;
          padding: 0.8rem 1rem;
          background: #ffffff;
        }
        .fc-help summary {
          font-weight: 600;
          cursor: pointer;
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
          padding: 0.8rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          justify-self: start;
        }
        .fc-primary-.fc-primary-button:hover {
          background-color: #1d4ed8;
        }
      `}</style>
    </s-page>
  );
}
