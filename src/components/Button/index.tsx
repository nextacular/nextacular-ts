import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center px-5 py-2 space-x-3 rounded disabled:opacity-75 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
