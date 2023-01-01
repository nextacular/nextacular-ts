import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, []);

  return (
    <main className="relative flex flex-col text-gray-800">{children}</main>
  );
};

export default LandingLayout;
