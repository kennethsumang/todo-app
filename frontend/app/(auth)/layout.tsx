interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = function (props) {
  return (
    <div style={{ height: '100vh' }}>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {props.children}
      </div>
    </div>
  )
}

export default AuthLayout;