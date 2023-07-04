import { Grid, Typography } from "@mui/material";
import { CartContext } from "gifts-store/context";
import { IOrderItem } from "gifts-store/interfaces";
import { formatCurrency } from "gifts-store/utils";
import React, { FC, useContext } from "react";

interface Props {
  orderValues?: {
    itemsNumber: number;
    subTotal: number;
    total: number;
    tax: number;
  };
}
export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { itemsNumber, subTotal, total, tax } = useContext(CartContext);
  const valuesToShow = orderValues
    ? orderValues
    : { itemsNumber, subTotal, total, tax };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {valuesToShow.itemsNumber}{" "}
          {valuesToShow.itemsNumber > 1 ? "items" : "item"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{formatCurrency(valuesToShow.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{formatCurrency(valuesToShow.tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">
          {formatCurrency(valuesToShow.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
