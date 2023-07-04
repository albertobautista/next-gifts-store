import { PeopleOutline } from "@mui/icons-material";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { api } from "gifts-store/api";
import { AdminLayout } from "gifts-store/components/layouts";
import { IUser } from "gifts-store/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const AdminUsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users?.map((user) => ({ ...user }));
    const updatedUsers = users?.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await api.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previosUsers);
      alert("No se pudo actualizar el role del usuario");
    }
  };
  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="client"> Client </MenuItem>
          </Select>
        );
      },
    },
  ];
  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));
  return (
    <AdminLayout
      title={"Usuarios"}
      subtitle={"Mantenimiento de Usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminUsersPage;
