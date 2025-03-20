"use server";

import { redirect } from "next/navigation";
import AppDrawer from "../_components/common/AppDrawer";
import AppPageContainer from "../_components/common/AppPageContainer";
import { getSessionFromServer } from "../_libs/session";
import React from "react";

interface Props {
   children: React.ReactNode;
}

const AppLayout: React.FC<Props> = async (props) => {
  const session = await getSessionFromServer();

  if (!session.user || !session.accessToken) {
    redirect("/");
  }

  return (
    <>
      <AppDrawer username={session.user.username} />
      <AppPageContainer>
        {props.children}
      </AppPageContainer>
    </>
  );
}

export default AppLayout;