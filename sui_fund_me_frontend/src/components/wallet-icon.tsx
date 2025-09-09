import React from 'react';
import Image from 'next/image';

interface WalletIconProps {
  name: string;
  logoSrc: string;
}

export const WalletIcon = ({ name, logoSrc }: WalletIconProps) => {
  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center transition-all group-hover:bg-gray-700 group-hover:scale-110">
        <Image 
          src={logoSrc} 
          alt={`${name} Wallet Logo`} 
          width={32} 
          height={32} 
        />
      </div>
      <span className="text-xs font-medium text-gray-300">{name}</span>
    </div>
  );
};