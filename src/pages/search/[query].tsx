import { Box, Typography } from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";
import { ProductList } from "gifts-store/components/products";
import { dbProducts } from "gifts-store/database";
import { IProduct } from "gifts-store/interfaces";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

export const SearchPage: NextPage<Props> = ({
  products,
  foundProducts,
  query,
}) => {
  return (
    <StoreLayout
      title={"Gifts-Store - Home"}
      pageDescription={"Home description"}
      pageTitle="Buscar Producto"
    >
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Resultados para: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No se encontro ningun producto:
          </Typography>
          <Typography variant="h2" sx={{ ml: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </StoreLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
