"use client";

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
   children: React.ReactNode;
}

const drawerWidth = 240;

const AppLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
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
            <Typography>{"User"}</Typography>
          </div>
          <Divider />
          <List>
            <ListItem key="Home" disablePadding>
              <ListItemButton>
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
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <div className="ml-[240px] p-3 h-full w-[calc(100% - 240px)]">
        <Paper square={false} className="!bg-[#f2f8fd] w-full h-full p-3">
          {props.children}
        </Paper>
      </div>
    </>
  );
}

export default AppLayout;