import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<Props> = (props) => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      {props.children}
    </GoogleOAuthProvider>
  )
};

export default GoogleAuthProvider;