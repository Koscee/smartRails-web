import Image from 'next/image';

function SmartRailsLogo({ width, height }) {
  return (
    <Image
      src="/assets/smartrails-primary.svg"
      alt="SmartRails Logo"
      width={width || 70}
      height={height || 35}
    />
  );
}

export default SmartRailsLogo;
