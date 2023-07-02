import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "gifts-store/components/cart";
import { StoreLayout } from "gifts-store/components/layouts";
import { CartContext } from "gifts-store/context";
import { countries } from "gifts-store/utils";
import Cookies from "js-cookie";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const SummaryPage = () => {
  const { address, itemsNumber } = useContext(CartContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!Cookies.get("firstName")) {
  //     router.push("/checkout/address");
  //   }
  // }, [router]);

  if (!address) return <></>;
  return (
    <StoreLayout
      title={"Resumen de Orden"}
      pageDescription={"Resumen de la orden"}
      pageTitle="Resumen de Orden"
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <CartList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({itemsNumber}{" "}
                {itemsNumber > 1 ? "productos" : "producto"} )
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>

                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {address?.firstName} {address?.lastName}
              </Typography>
              <Typography>
                {address.address}, {address.address2 ? address.address2 : ""}
              </Typography>
              <Typography>
                {address.city}, {address.zip}
              </Typography>
              <Typography>
                {
                  countries.find((country) => country.code === address.country)
                    ?.name
                }
              </Typography>
              <Typography>{address.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export default SummaryPage;
