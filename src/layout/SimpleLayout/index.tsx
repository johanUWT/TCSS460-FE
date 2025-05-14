'use client';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
