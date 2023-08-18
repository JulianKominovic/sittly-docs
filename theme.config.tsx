import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Sittly</span>,
  project: {
    link: "https://github.com/JulianKominovic/sittly-launcher",
  },
  chat: {},
  docsRepositoryBase: "https://github.com/JulianKominovic/sittly-docs",
  footer: {
    text: (
      <>
        Made using{" "}
        <a
          href="https://nextra.site/"
          style={{
            textDecoration: "underline",
            margin: "0 4px",
          }}
          target="_blank"
        >
          Nextra Docs Template
        </a>
      </>
    ),
  },
};

export default config;
