import { Typography } from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";
import { ProductList } from "gifts-store/components/products";
import { FullScreenLoading } from "gifts-store/components/ui";
import { useProducts } from "gifts-store/hooks";

export default function HomePage() {
  const { products, isLoading } = useProducts("/products");

  return (
    <StoreLayout
      title={"Gifts-Store - Home"}
      pageDescription={"Home description"}
      pageTitle="Tienda"
    >
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </StoreLayout>
  );
}
