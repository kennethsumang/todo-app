interface Props {
  children: React.ReactNode;
}

/**
 * Custom Divider with text
 * Source: https://stackoverflow.com/a/61731037
 */
const CustomDivider: React.FC<Props> = function(props) {
  return (
    <div className="flex items-center">
      <div className="border-b-1 w-full" />
      <span className="pr-[10px] pl-[10px]">
        {props.children}
      </span>
      <div className="border-b-1 w-full" />
    </div>
  );
};

export default CustomDivider;