import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { initialData } from "gifts-store/database/seed-data";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { formatCurrency } from "gifts-store/utils";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { CartContext } from "gifts-store/context";
import { ICartProduct } from "gifts-store/interfaces";

interface Props {
  isEditable?: boolean;
}

export const CartList: FC<Props> = ({ isEditable = false }) => {
  const { cart, updateProductCarQuantity, removeProductCart } =
    useContext(CartContext);

  const onNewProductCartQuantity = (
    product: ICartProduct,
    newQuantity: number
  ) => {
    product.quantity = newQuantity;
    updateProductCarQuantity(product);
  };
  return (
    <>
      {cart.map((product) => (
        <div key={product.slug + product.size}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink
                href={`/product/${product.slug}`}
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={product.image}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
                </Typography>
                {isEditable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    maxValue={10}
                    updateQuantity={(value) =>
                      onNewProductCartQuantity(product, value)
                    }
                  />
                ) : (
                  <Typography>
                    {product.quantity}
                    {product.quantity > 1 ? "productos" : "producto"}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">
                {formatCurrency(product.price)}
              </Typography>
              {isEditable && (
                <Tooltip title="Eliminar del carrito">
                  <IconButton onClick={() => removeProductCart(product)}>
                    <DeleteForeverOutlined color="error" />
                    <Typography color="error">Eliminar</Typography>
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, mr: 3 }} />
        </div>
      ))}
    </>
  );
};
