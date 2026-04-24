import React from 'react';
import { colors } from '../style/theme';
import { design } from '../style/design';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'neutral';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle = `${design.padding.sm} ${design.borderRadius.md} font-medium transition-colors`;
  let variantStyle = '';

  switch (variant) {
    case 'primary':
      variantStyle = `${colors.primary.bg} ${colors.white.text} hover:opacity-90`;
      break;
    case 'secondary':
      variantStyle = `${colors.secondary.bg} ${colors.white.text} hover:opacity-90`;
      break;
    case 'neutral':
      variantStyle = `${colors.neutral.bg} ${colors.black.text} border ${colors.divider.border} hover:${colors.surface.bg}`;
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
