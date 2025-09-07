interface Props extends React.ComponentProps<"svg"> {
  size?: number;
}

export const SvgWrapper = ({ children, size = 34, ...props }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};
