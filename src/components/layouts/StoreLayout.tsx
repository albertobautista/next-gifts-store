import Head from "next/head";
import React, { FC } from "react";
import { Navbar, SideMenu } from "../ui";
import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFullURL?: string;
  pageTitle?: string;
}

export const StoreLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullURL,
  pageTitle,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullURL && <meta name="og:image" content={imageFullURL} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: "100px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          {pageTitle}
        </Typography>
        {children}
      </main>
      <footer></footer>
    </>
  );
};
