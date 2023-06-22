import { SentimentDissatisfiedOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";
import NextLink from "next/link";
const NotFound = () => {
  return (
    <StoreLayout
      title={"Page not found"}
      pageDescription={"Pagina sin informacion"}
      pageTitle=""
    >
      <Box
        sx={{ flexDirection: { xs: "column", sm: "column" } }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 200px)"
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: 100, sm: 160 } }}
          fontWeight={200}
        >
          404
        </Typography>
        <Typography fontSize={40} sx={{ fontSize: { xs: 20, sm: 35 } }}>
          No se encontró la página
        </Typography>
        <Typography sx={{ fontSize: { xs: 12, sm: 20 } }}>
          Lo sentimos, no se pudo encontrar la página solicitada. Por favor,
          vuelve a la página de inicio.
        </Typography>
        <NextLink href="/" passHref legacyBehavior>
          <Link
            underline="always"
            color="secondary"
            sx={{ fontSize: { xs: 15, sm: 20 } }}
          >
            Regresar al Inicio
          </Link>
        </NextLink>
      </Box>
    </StoreLayout>
  );
};

export default NotFound;
