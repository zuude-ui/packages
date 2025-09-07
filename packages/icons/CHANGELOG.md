const = ({ variant = "monochrome", size = DEFAULT_SIZE, ...props }: Props) => {
if (variant === "branded") {
return (
<SvgWrapper size={size} {...props}>

      </SvgWrapper>
    );

}

return (
<SvgWrapper size={size} {...props}>

    </SvgWrapper>

);
};
