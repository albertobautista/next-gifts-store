import NextLink from "next/link";
import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StoreLayout } from "gifts-store/components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "fullName",
    headerName: "Nombre completo",
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
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Show order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: false, fullName: "Snow Jon" },
  { id: 2, paid: true, fullName: "Lannister Cersei" },
  { id: 3, paid: false, fullName: "Lannister Jaime" },
  { id: 4, paid: true, fullName: "Stark Arya" },
  { id: 5, paid: false, fullName: "Targaryen Daenerys" },
  { id: 6, paid: false, fullName: "Melisandre" },
  { id: 7, paid: false, fullName: "Clifford" },
  { id: 8, paid: true, fullName: "Frances" },
  { id: 9, paid: false, fullName: "Roxie" },
  { id: 10, paid: true, fullName: "Roxie" },
  { id: 11, paid: true, fullName: "Roxie" },
  { id: 12, paid: false, fullName: "Roxie" },
];
const HistoryPage = () => {
  return (
    <StoreLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
      pageTitle="Historial de Ordenes"
    >
      <Grid container>
        <Grid item xs={12} sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            // pageSize={10}
            // rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export default HistoryPage;
