// next
import Image from 'next/image';

// ==============================|| LOGO ICON SVG ||============================== //

const logoIcon = 'assets/images/logo-icon.svg';

export default function LogoIcon() {
  return <Image src={logoIcon} alt="UW" width={55} height={55} />;
}
