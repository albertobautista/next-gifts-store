import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { StorefrontOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { UiContext } from "gifts-store/context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <IconButton>
              <StorefrontOutlined color="primary" />
            </IconButton>
            <Typography variant="h5">Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
