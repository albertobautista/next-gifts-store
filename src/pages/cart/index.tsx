import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "gifts-store/components/cart";
import { StoreLayout } from "gifts-store/components/layouts";
import { CartContext } from "gifts-store/context";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) return <></>;
  return (
    <StoreLayout
      title={"Carrito - 3"}
      pageDescription={"Carrito de compras"}
      pageTitle="Mi Carrito"
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <CartList isEditable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button href="/checkout/address" color="secondary" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export default CartPage;
