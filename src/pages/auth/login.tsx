import NextLink from "next/link";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "gifts-store/components/layouts";
import { useForm } from "react-hook-form";
import { isEmail } from "gifts-store/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "gifts-store/context";
import { useRouter } from "next/router";
import { getSession, signIn, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";

type TFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const onLogin = async ({ email, password }: TFormData) => {
    setShowError(false);
    signIn("credentials", { email, password });
  };

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res);
    });
  }, []);

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box
          sx={{
            width: 350,
            padding: "10px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            borderRadius: 2,
            boxShadow: 10,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Iniciar sesión
              </Typography>
              {showError && (
                <Chip
                  label="Error al iniciar sesión"
                  color="error"
                  className="fadeIn"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="secondary" size="large" fullWidth>
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                passHref
                legacyBehavior
              >
                <Link underline="always">Registrarse</Link>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials")
                  return <div key="credentials"></div>;
                return (
                  <Button
                    key={provider.name}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => signIn(provider.id)}
                    sx={{ mr: 1 }}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default LoginPage;
