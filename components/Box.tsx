import React from 'react';
import { design } from '../style/design';
import { colors } from '../style/theme';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: keyof typeof design.padding;
  margin?: keyof typeof design.margin;
  borderRadius?: keyof typeof design.borderRadius;
  bgColor?: keyof typeof colors;
};

export const Box: React.FC<BoxProps> = ({
  children,
  padding,
  margin,
  borderRadius,
  bgColor,
  className = '',
  ...props
}) => {
  const pClass = padding ? design.padding[padding] : '';
  const mClass = margin ? design.margin[margin] : '';
  const brClass = borderRadius ? design.borderRadius[borderRadius] : '';
  const bgClass = bgColor ? colors[bgColor] : '';

  return (
    <div className={`${pClass} ${mClass} ${brClass} ${bgClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
