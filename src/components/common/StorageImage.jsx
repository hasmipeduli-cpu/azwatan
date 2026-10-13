import React from 'react';
import { useResolvedStorageUrl } from '../../services/storage';

/**
 * <img> that understands IndexedDB storage paths ("covers/...",
 * "audio/...") as well as plain static/external URLs. Storage paths
 * are resolved to a live blob: URL before rendering.
 */
export default function StorageImage({
  src,
  fallback = '/covers/cover-arab.jpg',
  alt = '',
  ...rest
}) {
  const resolved = useResolvedStorageUrl(src);
  return (
    <img
      src={resolved || fallback}
      alt={alt}
      onError={(e) => {
        if (e.currentTarget.src !== window.location.origin + fallback) {
          e.currentTarget.src = fallback;
        }
      }}
      {...rest}
    />
  );
}
