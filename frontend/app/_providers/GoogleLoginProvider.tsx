import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  children: React.ReactNode;
}

const GoogleLoginProvider: React.FC<Props> = function(props) {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
      {props.children}
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginProvider;