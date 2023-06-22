import Head from "next/head";
import React, { FC } from "react";
import { SideMenu } from "../ui";
import { Box, Typography } from "@mui/material";
import { AdminNavbar } from "../admin";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subtitle, icon }) => {
  return (
    <>
      {/* <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullURL && <meta name="og:image" content={imageFullURL} />}
      </Head> */}
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography sx={{ mb: 1 }} variant="h5" component="h2">
            {subtitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
      {/* <footer></footer> */}
    </>
  );
};
