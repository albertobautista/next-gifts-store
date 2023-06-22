import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { MENU_OPTIONS } from "gifts-store/utils";
import { useContext, useState } from "react";
import { CartContext, UiContext } from "gifts-store/context";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);
  const { itemsNumber } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearch = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  const { asPath, push } = useRouter();
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
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "flex" },
            gap: 2,
            ml: 5,
            width: "100%",
          }}
          className="fadeIn"
        >
          {MENU_OPTIONS.map((option) => (
            <Box key={option.value}>
              <NextLink
                href={`/category/${option.value}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      textDecoration: `${
                        asPath === `/category/${option.value}`
                          ? "underline"
                          : "none"
                      }`,
                    }}
                    className="strong-btn"
                    color={
                      asPath === `/category/${option.value}`
                        ? "primary"
                        : "info"
                    }
                  >
                    {option.text}
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          ))}
        </Box>
        <Box flex={1} />
        {/* Pantallas grandes */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && onSearch()}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                  color="error"
                >
                  <ClearOutlined color="error" />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas chicas */}
        <IconButton
          onClick={toggleSideMenu}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={itemsNumber} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
