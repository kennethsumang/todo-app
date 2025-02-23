import classes from "./CustomDivider.module.css";

interface Props {
  children: React.ReactNode;
}

/**
 * Custom Divider with text
 * Source: https://stackoverflow.com/a/61731037
 */
const CustomDivider: React.FC<Props> = function(props) {
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>
        {props.children}
      </span>
      <div className={classes.border} />
    </div>
  );
};

export default CustomDivider;