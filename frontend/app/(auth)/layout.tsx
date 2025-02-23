import classes from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = function (props) {
  return (
    <div className={classes.layoutContainer}>
      <div className={classes.mainContainer}>
        {props.children}
      </div>
    </div>
  )
}

export default AuthLayout;