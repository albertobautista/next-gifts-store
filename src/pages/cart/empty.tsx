import NextLink from "next/link";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";

const EmptyPage = () => {
  return (
    <StoreLayout
      title={"Carrito vacio"}
      pageDescription={"NO hay articulos en el carrito"}
      pageTitle=""
    >
      <Box
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 200px)"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito esta vacio</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h4" color="secondary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </StoreLayout>
  );
};

export default EmptyPage;
