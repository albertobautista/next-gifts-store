import { Typography } from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";
import { ProductList } from "gifts-store/components/products";
import { FullScreenLoading } from "gifts-store/components/ui";
import { useProducts } from "gifts-store/hooks";
import { PRODUCT_TYPE_OPTIONS, processText } from "gifts-store/utils";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const { products, isLoading } = useProducts(`/products?type=${categoryName}`);

  return (
    <StoreLayout
      title={"Gifts-Store - Home"}
      pageDescription={"Home description"}
      pageTitle="Tienda"
    >
      <Typography variant="h2" sx={{ mb: 1 }}>
        {processText(categoryName?.toString(), PRODUCT_TYPE_OPTIONS)}
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </StoreLayout>
  );
};

export default CategoryPage;
