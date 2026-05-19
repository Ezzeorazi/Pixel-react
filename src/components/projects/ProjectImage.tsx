'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  imageUrl?: string;
  name: string;
  sizes?: string;
}

export function ProjectImage({ imageUrl, name, sizes }: Props) {
  const [failed, setFailed] = useState(false);

  if (!imageUrl || failed) {
    return (
      <div className="h-full bg-linear-to-br from-purple-600/20 via-fuchsia-600/10 to-pink-600/20 flex items-center justify-center">
        <span className="text-5xl font-black text-white/10 select-none">{name[0]}</span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={name}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      sizes={sizes ?? '(max-width: 768px) 100vw, 33vw'}
      onError={() => setFailed(true)}
    />
  );
}
