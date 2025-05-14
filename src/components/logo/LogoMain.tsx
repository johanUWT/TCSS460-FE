'use client';

// next
import Image from 'next/image';

const logo = 'assets/images/logo.svg';

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  return <Image src={logo} alt="TCSS 460" width={200} height={34} />;
}
