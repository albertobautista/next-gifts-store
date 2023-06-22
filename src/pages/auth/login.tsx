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
// import { api } from "gifts-store/api";
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
    // // const isValidLogin = await login(email, password);
    // // if (!isValidLogin) {
    // //   setShowError(true);
    // //   setTimeout(() => {
    // //     setShowError(false);
    // //   }, 3000);
    // //   return;
    // // }
    // // const destination = router.query?.p?.toString() || "/";
    // // router.replace(destination);
    // try {
    //   const { data } = await api.post("/user/login", { email, password });
    //   console.log(data);
    //   const { token, user } = data;
    // } catch (error) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    // }
  };

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res);
    });
  }, []);

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar sesion
              </Typography>
              {showError && (
                <Chip
                  label="Error al iniciar sesion"
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
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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
