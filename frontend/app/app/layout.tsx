import AppDrawer from "../_components/common/AppDrawer";
import AppPageContainer from "../_components/common/AppPageContainer";
import { getSessionFromServer } from "../_libs/session";

interface Props {
   children: React.ReactNode;
}

const AppLayout: React.FC<Props> = async (props) => {
  const session = await getSessionFromServer();

  return (
    <>
      <AppDrawer username={session.user?.username ?? ""} />
      <AppPageContainer>
        {props.children}
      </AppPageContainer>
    </>
  );
}

export default AppLayout;