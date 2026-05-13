import styles from "./SiteFooter.module.css";

const CARE_LINKS = [
  "Help Center",
  "Track My Order",
  "Shipping Information",
  "Payment Policy",
  "Jewelry Care",
  "Warranty",
] as const;

const ABOUT_LINKS = ["Our Story", "Blog", "Sizing Guide", "Collaborations", "Sustainability"] as const;

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Payment Policy"] as const;

const FOOTER_SECTIONS = [
  { title: "CUSTOMER CARE", links: CARE_LINKS },
  { title: "ABOUT US", links: ABOUT_LINKS },
  { title: "LEGAL & PRIVACY", links: LEGAL_LINKS },
] as const;

function AccordionChevron() {
  return (
    <svg
      className={styles.accordionChevron}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SubmitArrowIcon() {
  return (
    <svg
      className={styles.submitArrow}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkList({ links }: { links: readonly string[] }) {
  return (
    <ul className={styles.links}>
      {links.map((label) => (
        <li key={label}>
          <a href="#">{label}</a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.wrap} data-node-id="91:5030" data-name="Footer">
      <div className={styles.upper} data-node-id="91:5031">
        <div className={styles.infoDesktop} data-name="Info">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className={styles.column}>
              <p className={styles.columnTitle}>{section.title}</p>
              <LinkList links={section.links} />
            </div>
          ))}
        </div>
        <div className={styles.infoMobile} data-name="Info">
          {FOOTER_SECTIONS.map((section) => (
            <details key={section.title} className={styles.accordionItem} data-name="Collapsed">
              <summary className={styles.accordionSummary}>
                <span className={styles.accordionTitle}>{section.title}</span>
                <span className={styles.accordionIconWrap}>
                  <AccordionChevron />
                </span>
              </summary>
              <div className={styles.accordionPanel}>
                <LinkList links={section.links} />
              </div>
            </details>
          ))}
        </div>
        <div className={styles.signup} data-node-id="91:5033" data-name="Footer">
          <div className={styles.signupInner}>
            <p className={styles.signupHeading} data-node-id="91:5036">
              KEY CLUB MEMBERS GET MORE
            </p>
            <p className={styles.signupBody} data-node-id="91:5037">
              Join for free to receive exclusive offers, gifts and more!
            </p>
            <form
              className={styles.emailRow}
              data-name="Input field - footer"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className={styles.emailInput}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
              <button type="submit" className={styles.submitBtn} aria-label="Submit email">
                <SubmitArrowIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.lower} data-node-id="91:5057">
        <p className={styles.copyright} data-node-id="91:5058">
          © 2008 - 2024 Oak &amp; Luna. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
