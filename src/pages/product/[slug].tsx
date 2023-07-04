import { StoreLayout } from "gifts-store/components/layouts";
import React, { use, useContext, useState } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  ProductSizeSelector,
  ProductSlideshow,
} from "gifts-store/components/products";
import { ItemCounter } from "gifts-store/components/ui";
import {
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  formatCurrency,
  processText,
} from "gifts-store/utils";
import { ICartProduct, IProduct, TSize } from "gifts-store/interfaces";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { dbProducts } from "gifts-store/database";
import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { CartContext } from "gifts-store/context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    title: product.title,
    size: undefined,
    slug: product.slug,
    gender: product.gender,
    quantity: 1,
  });

  const router = useRouter();

  const selectedSize = (size: TSize) => {
    setTempCartProduct((currentProduct) => ({ ...currentProduct, size }));
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    addToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <StoreLayout
      title={product.title}
      pageDescription={product.description}
      pageTitle="Detalle del producto"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ProductSlideshow isDetail images={product.images} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {formatCurrency(product.price)}
            </Typography>

            <Box sx={{ my: 2 }} display="flex" flexDirection="column" gap={1}>
              <Box display="flex" flexDirection="column">
                <Typography fontWeight={700}>Cantidad</Typography>
                <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  updateQuantity={updateQuantity}
                  maxValue={product.inStock > 5 ? 5 : product.inStock}
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1.9}>
                <Typography fontWeight={700}>Selecciona una talla</Typography>
                <ProductSizeSelector
                  selectedSize={tempCartProduct.size}
                  sizes={product.sizes}
                  onSelectedSize={selectedSize}
                />
                {product.inStock > 0 ? (
                  <Button
                    onClick={onAddProduct}
                    color="secondary"
                    disabled={!tempCartProduct.size}
                  >
                    {tempCartProduct.size
                      ? "Agregar al carrito"
                      : "Seleccione una talla"}
                  </Button>
                ) : (
                  <Chip
                    label="No hay disponible"
                    color="error"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ mt: 2 }} display="flex" flexDirection="column" gap={2}>
              <Typography fontSize={25} fontWeight={700}>
                Detalle del porducto
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontWeight={600}>Descripción</Typography>
                <Typography variant="body2" align="justify">
                  {product.description}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <Typography fontWeight={600}>Tipo:</Typography>
                <Typography>
                  {processText(product.type, PRODUCT_TYPE_OPTIONS)}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <Typography fontWeight={600}>Genero:</Typography>
                <Typography>
                  {processText(product.gender, PRODUCT_GENDER_OPTIONS)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StoreLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productsSlugs.map((obj) => ({ params: { slug: obj.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
