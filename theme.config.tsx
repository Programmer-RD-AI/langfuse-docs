import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "./components/logo";
import { useRouter } from "next/router";
import Footer from "./components/footer";

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/finto-technologies/langfuse",
  },
  chat: {
    link: "https://discord.gg/7NXusRtqYU",
  },
  docsRepositoryBase:
    "https://github.com/finto-technologies/langfuse-docs/tree/main",
  footer: {
    text: "langfuse",
    component: Footer
    },
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath !== "/" ? "%s - langfuse" : "langfuse",
    };
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://langfuse.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta
          property="og:description"
          content={
            frontMatter.description ?? asPath !== "/"
              ? "langfuse documentation"
              : "Open-source experimentation platform for LLM-based applications"
          }
        />
        <meta property="og:image" content="https://langfuse.com/og.png" />
      </>
    );
  },
  // Fix formatting for lists; remote mt-6
  components: {
    ul: (props: { children: React.ReactNode }) => (
      <ul className="list-disc ltr:ml-6 rtl:mr-6">{props.children}</ul>
    ),
    ol: (props: { children: React.ReactNode }) => (
      <ol className="list-decimal ltr:ml-6 rtl:mr-6">{props.children}</ol>
    ),
  },
  faviconGlyph: "🪢",
};

export default config;
