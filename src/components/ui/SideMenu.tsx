import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "gifts-store/context";
import { useRouter } from "next/router";
import { MENU_OPTIONS } from "gifts-store/utils";

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigateTo = (path: string) => {
    toggleSideMenu();
    router.push(path);
  };

  const onSearch = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Drawer
      onClose={toggleSideMenu}
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && onSearch()}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem onClick={() => navigateTo("profile")}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </>
          )}

          {MENU_OPTIONS.map((option) => (
            <ListItem
              key={option.value}
              onClick={() => navigateTo(`/category/${option.value}`)}
              sx={{ display: { xs: "", sm: "none" } }}
            >
              <ListItemIcon>
                <MaleOutlined />
              </ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}

          {isLoggedIn ? (
            <ListItem onClick={onLogout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <ListItem
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Divider />

              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem onClick={() => navigateTo("/admin/")}>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItem>

              <ListItem onClick={() => navigateTo("/admin/users/")}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
              <ListItem onClick={() => navigateTo("/admin/products/")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
