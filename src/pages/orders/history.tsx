import NextLink from "next/link";
import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StoreLayout } from "gifts-store/components/layouts";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "gifts-store/database";
import { IOrder } from "gifts-store/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "fullName",
    headerName: "ID Usuario",
    width: 300,
    sortable: false,
  },
  {
    field: "paid",
    headerName: "Pagado",
    description: "Esta orden ya fue pagada?",
    width: 200,
    renderCell: (params) => {
      return params.value ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },

  {
    field: "order",
    headerName: "Show order",
    description: "Show order page",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.order}`} passHref legacyBehavior>
          <Link underline="always">Show order</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullName: order.user,
    order: order._id,
  }));

  return (
    <StoreLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
      pageTitle="Historial de Ordenes"
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUserId(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
