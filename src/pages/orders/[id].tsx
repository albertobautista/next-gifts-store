import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
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
import { GetServerSideProps, NextPage } from "next";
import { CartList, OrderSummary } from "gifts-store/components/cart";
import { StoreLayout } from "gifts-store/components/layouts";

import NextLink from "next/link";
import { getSession } from "next-auth/react";
import { dbOrders } from "gifts-store/database";
import { IOrder } from "gifts-store/interfaces";

interface Props {
  order: IOrder;
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const { _id, orderItems, numberOfItems, isPaid, subTotal, total, tax } =
    order;
  return (
    <StoreLayout
      title={`Resumen de Orden ${_id}`}
      pageDescription={"Resumen de la orden"}
      pageTitle={`Orden: ${_id}`}
    >
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden Pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}
                {numberOfItems > 1 ? " productos" : " producto"} )
              </Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{
                  itemsNumber: numberOfItems,
                  subTotal,
                  total,
                  tax,
                }}
              />
              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden Pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrdersById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user.id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
export default OrderPage;
