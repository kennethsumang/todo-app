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
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}>
          <div style={{
            height: '100%',
            width: '100%',
            backgroundImage: 'url("/background.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}></div>
          <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              width: '100%',
              marginLeft: '3rem',
              marginRight: '3rem',
            }}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;