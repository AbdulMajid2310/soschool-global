// src/hooks/use-fullscreen.ts
'use client';

import { useEffect } from 'react';

export const useFullscreen = () => {
  useEffect(() => {
    const enableFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      window.removeEventListener('click', enableFullscreen);
    };

    window.addEventListener('click', enableFullscreen);
    return () => window.removeEventListener('click', enableFullscreen);
  }, []);
};