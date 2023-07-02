import { CreditCardOutlined, DashboardOutlined } from "@mui/icons-material";
import { CardContent, Grid, Typography, Card } from "@mui/material";
import { SummaryTitle } from "gifts-store/components/admin";
import { AdminLayout } from "gifts-store/components/layouts";
import { IDashboardSummary } from "gifts-store/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const DashboardPage = () => {
  const { data, error } = useSWR<IDashboardSummary>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });
  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!error && !data) return <div>Cargando...</div>;
  if (error) return <Typography>Ha ocurrido un error</Typography>;

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTitle
          title={numberOfOrders}
          subtitle={"Ordenes totales"}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={paidOrders}
          subtitle={"Ordenes pagadas"}
          icon={<CreditCardOutlined color="warning" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={notPaidOrders}
          subtitle={"Ordenes pendientes"}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={numberOfClients}
          subtitle={"Clientes"}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={numberOfProducts}
          subtitle={"Productos"}
          icon={<CreditCardOutlined color="error" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={productsWithNoInventory}
          subtitle={"Sin existencias"}
          icon={<CreditCardOutlined color="success" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={lowInventory}
          subtitle={"Inventario bajo"}
          icon={<CreditCardOutlined color="success" sx={{ fontSize: 50 }} />}
        />
        <SummaryTitle
          title={refreshIn}
          subtitle={"Actualizado en "}
          icon={<CreditCardOutlined color="success" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
