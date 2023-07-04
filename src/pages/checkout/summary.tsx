import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "gifts-store/components/cart";
import { StoreLayout } from "gifts-store/components/layouts";
import { CartContext } from "gifts-store/context";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const SummaryPage = () => {
  const router = useRouter();
  const { itemsNumber, createOrder } = useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`);
  };

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
                Resumen ({itemsNumber}
                {itemsNumber > 1 ? " productos" : " producto"} )
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                <Button
                  onClick={onCreateOrder}
                  color="secondary"
                  fullWidth
                  disabled={isPosting}
                >
                  Confirmar Orden
                </Button>
                {errorMessage && (
                  <Chip sx={{ mt: 2 }} color="error" label={errorMessage} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export default SummaryPage;
