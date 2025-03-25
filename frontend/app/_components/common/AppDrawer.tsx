"use client";

import requestLogout from "@/app/_requests/auth/logout.request";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
}

const AppDrawer: React.FC<Props> = ({ username }) => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: () => requestLogout(),
    onSuccess: () => router.push("/"),
    onError: () => router.push("/"),
  });

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          borderRight: 'none',
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <div className="mt-3 mb-3 ml-3">
        <Image src="/Logo Header.svg" width="102" height="64" alt="logo" />
        <Divider />
        <div className="flex flex-col items-center mt-3 mb-3">
          <Image src="/Avatar.svg" width="64" height="64" alt="avatar" />
          <Typography>{username}</Typography>
        </div>
        <Divider />
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={() => router.push("/todos")}>
              <ListItemIcon>
                <Image src="/Home.svg" width="24" height="24" alt="home" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Sign out" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Image src="/Signout.svg" width="24" height="24" alt="signout" />
              </ListItemIcon>
              <ListItemText primary="Sign out" onClick={() => mutateAsync()} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default AppDrawer;