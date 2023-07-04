import {
  CardGiftcardOutlined,
  CategoryOutlined,
  CheckBoxOutlineBlankOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  InfoOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { CardContent, Grid, Typography, Card } from "@mui/material";
import { GridViewColumnIcon } from "@mui/x-data-grid";
import { SummaryTitle } from "gifts-store/components/admin";
import { AdminLayout } from "gifts-store/components/layouts";
import { FullScreenLoading } from "gifts-store/components/ui";
import { IDashboardSummary } from "gifts-store/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const DashboardPage = () => {
  const { data, error, isLoading } = useSWR<IDashboardSummary>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );
  if (!error && !data) {
    return <></>;
  }
  if (error) return <Typography>Ha ocurrido un error</Typography>;

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfAdmins,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      {!data && !error ? (
        <FullScreenLoading />
      ) : (
        <Grid container spacing={2}>
          <SummaryTitle
            title={numberOfOrders}
            subtitle={"Ordenes totales"}
            icon={<GridViewColumnIcon color="warning" sx={{ fontSize: 50 }} />}
          />
          <SummaryTitle
            title={numberOfClients}
            subtitle={"Clientes"}
            icon={<PeopleAltOutlined color="primary" sx={{ fontSize: 50 }} />}
          />
          <SummaryTitle
            title={numberOfAdmins}
            subtitle={"Administradores"}
            icon={<PeopleAltOutlined color="primary" sx={{ fontSize: 50 }} />}
          />
          <SummaryTitle
            title={numberOfProducts}
            subtitle={"Productos"}
            icon={<CategoryOutlined color="success" sx={{ fontSize: 50 }} />}
          />
          <SummaryTitle
            title={productsWithNoInventory}
            subtitle={"Sin existencias"}
            icon={
              <CheckBoxOutlineBlankOutlined
                color="error"
                sx={{ fontSize: 50 }}
              />
            }
          />
          <SummaryTitle
            title={lowInventory}
            subtitle={"Inventario bajo"}
            icon={<InfoOutlined color="secondary" sx={{ fontSize: 50 }} />}
          />
        </Grid>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
