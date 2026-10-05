'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy HTML files are real SSR pages; move their address to the clean route
 * after hydration so active navigation and subsequent Back/Forward stay in sync. */
export function CanonicalUrl({ path }: { path: string }) {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname.endsWith('.html')) {
      router.replace(`${path}${window.location.search}${window.location.hash}`, { scroll: false });
    }
  }, [path, router]);
  return null;
}
