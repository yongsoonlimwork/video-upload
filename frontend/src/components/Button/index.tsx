import React from 'react';
import styled from 'styled-components';

const handlePadding = (size?: IButtonProps['size']) => {
  switch (size) {
    case 'small':
      return 'padding: 4px 6px; border-radius: 2px;';
    case 'large':
      return 'padding: 12px 18px; border-radius: 6px;';
    default: // medium as default too
      return 'padding: 8px 12px; border-radius: 4px;';
  }
};

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
}

const Button: FCC<IButtonProps> = ({ size = 'medium', type = 'button', children, ...restProps }) => {
  return (
    <StyledButton size={size} type={type} {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;

interface IStyledButtonProps {
  size?: IButtonProps['size'];
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${({ size }) => handlePadding(size)}
  border: 1px solid #a9a9a9;
  background-color: #a9a9a9;

  &:hover {
    background-color: #9e9e9e;
  }

  &:active {
    border: 1px inset white;
  }
`;
