import React, { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { IProduct } from "gifts-store/interfaces";
import {
  PRODUCT_TYPE_OPTIONS,
  formatCurrency,
  processText,
  truncateText,
} from "gifts-store/utils";
import { ProductSlideshow } from "./ProductSlideshow";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  console.log("product", product);
  // const productImage = useMemo(() => {
  //   return isHovered
  //     ? `products/${product.images[1]}`
  //     : `products/${product.images[0]}`;
  // }, [isHovered, product.images]);

  return (
    <Grid
      xs={12}
      sm={6}
      md={4}
      item
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        {/* <NextLink
          href={"product/slug"}
          passHref
          legacyBehavior
          prefetch={false}
        >
          <Link> */}
        <Box sx={{ position: "relative" }}>
          {product.inStock === 0 && (
            <Chip
              color="secondary"
              label="No hay disponibles"
              sx={{
                position: "absolute",
                zIndex: 99,
                top: "20px",
                left: "10px",
              }}
            />
          )}
          <ProductSlideshow images={product.images} />
        </Box>
        {/* <CardMedia
                component={"img"}
                image={productImage}
                alt={product.title}
                className="fadeIn"
              /> */}
        {/* </CardActionArea> */}
        {/* </Link>
        </NextLink> */}

        <Box
          sx={{ mt: 1, p: 2 }}
          className="fadeIn"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={1}
        >
          <Typography fontWeight={700} fontSize={20}>
            {product.title}
          </Typography>
          <Typography variant="body2" align="justify">
            {truncateText(product.description, 100)}
          </Typography>
          <Box display="flex" gap={1}>
            <Typography fontWeight={700}>Tipo: </Typography>
            <Typography>
              {processText(product.type, PRODUCT_TYPE_OPTIONS)}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography fontWeight={700}>Tallas disponibles: </Typography>
            <Typography>{product.sizes.join(", ")}</Typography>
          </Box>
          <Typography fontWeight={600} fontSize={20} align="right">
            {formatCurrency(product.price)}
          </Typography>
          <NextLink
            href={`/product/${product.slug}`}
            passHref
            legacyBehavior
            prefetch={false}
          >
            <Link>
              <Button
                color="primary"
                size="medium"
                fullWidth
                className="bordered-btn"
              >
                <Typography fontSize={13}>VER MÁS</Typography>
              </Button>
            </Link>
          </NextLink>
        </Box>
      </Card>
    </Grid>
  );
};
