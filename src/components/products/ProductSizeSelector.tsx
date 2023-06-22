import { Box, Button } from "@mui/material";
import { TSize } from "gifts-store/interfaces";
import { FC } from "react";

interface Props {
  selectedSize?: TSize;
  sizes: TSize[];
  onSelectedSize: (size: TSize) => void;
}
export const ProductSizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={() => onSelectedSize(size)}
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
          sx={{
            border: "1px solid #000",
            mx: 0.5,
          }}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
