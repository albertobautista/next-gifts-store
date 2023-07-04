import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { AdminLayout } from "../../../components/layouts";
import { IProduct, TGender, TSize, TTypes } from "../../../interfaces";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { dbProducts } from "../../../database";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { set } from "mongoose";
import { api } from "gifts-store/api";
import { Product } from "gifts-store/models";
import { useRouter } from "next/router";

const validTypes: TTypes[] = [
  "shirts",
  "pants",
  "hoodies",
  "hats",
  "accessories",
  "jerseys",
  "shoes",
  "caps",
];
const validGender: TGender[] = ["men", "women", "kids", "unisex"];
const validSizes: TSize[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: TSize[];
  slug: string;
  tags: string[];
  title: string;
  type: TTypes;
  gender: TGender;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });
  const onChangeSize = (size: TSize) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        {
          shouldValidate: true,
        }
      );
    }

    setValue("sizes", [...currentSizes, size], {
      shouldValidate: true,
    });
  };

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLowerCase();
    setNewTagValue("");
    const currentTags = getValues("tags");
    if (currentTags.includes(newTag)) {
      return;
    }
    currentTags.push(newTag);
  };
  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((t) => t !== tag);
    setValue("tags", updatedTags, {
      shouldValidate: true,
    });
  };

  const onFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length === 0) return;
    try {
      for (const file of event.target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await api.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {}
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) {
      return alert("Minimo son 2 imagenes");
    }
    setIsSaving(true);
    try {
      const resp = await api({
        url: "admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
        alert("Producto creado correctamente");
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
    }
  };
  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      {
        shouldValidate: true,
      }
    );
  };

  useEffect(() => {
    const suscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value
            .title!.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLowerCase() || "";

        setValue("slug", newSlug, {
          shouldValidate: true,
        });
      }
    });

    return () => {
      suscription.unsubscribe();
    };
  }, [watch, setValue]);

  return (
    <AdminLayout
      title={"Producto"}
      subtitle={`${
        product.images.length > 0 ? "Editando: " + product.title : ""
      }`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Mínimo de valor 0" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Mínimo de valor 0" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={(event) =>
                  setValue("type", event.target.value as TTypes, {
                    shouldValidate: true,
                  })
                }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues("gender")}
                onChange={(event) =>
                  setValue("gender", event.target.value as TGender, {
                    shouldValidate: true,
                  })
                }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={getValues("sizes").includes(size)}
                    />
                  }
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Este campo es requerido",
                validate: (value) =>
                  value.trim().includes(" ")
                    ? "No debe contener espacios"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
              value={newTagValue}
              onChange={(event) => setNewTagValue(event.target.value)}
              onKeyUp={({ code }) =>
                code === "Space" ? onNewTag() : undefined
              }
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues("tags").map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Cargar imagen
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg, images/jpg"
                style={{ display: "none" }}
                onChange={onFilesSelected}
              />
              {getValues("images").length < 2 && (
                <Chip
                  label="Es necesario al 2 imagenes"
                  color="error"
                  variant="outlined"
                />
              )}

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          onClick={() => onDeleteImage(img)}
                          fullWidth
                          color="error"
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;
  let product: IProduct | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = [];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
