import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { StoreLayout } from "gifts-store/components/layouts";
import { AuthContext } from "gifts-store/context";
import Image from "next/image";
import { useContext } from "react";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  if (!user) return <></>;

  return (
    <StoreLayout title={"Perfil"} pageDescription={"Página de perfil"}>
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: 350, padding: "10px 20px", textAlign: "center" }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} width={250} height={250} position="relative">
                  <Image src={user.picture} alt={user.name} fill />
                </Grid>
                <Grid item xs={12}>
                  <Typography>{user.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{user.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Rol: {user.role}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </StoreLayout>
  );
}
