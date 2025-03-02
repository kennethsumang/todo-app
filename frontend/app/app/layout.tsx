interface Props {
   children: React.ReactNode;
}

const AppLayout: React.FC<Props> = (props) => {
   return <>{props.children}</>;
}

export default AppLayout;