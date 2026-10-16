import { ImageZoom } from '@fumadocs/base-ui/components/image-zoom';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'img'> & { 'data-no-zoom'?: boolean | string };

export function ZoomableImage({ 'data-no-zoom': skip, ...props }: Props) {
  if (skip || typeof props.src !== 'string' || Number(props.width) <= 96 && Number(props.height) <= 96) {
    return <img loading="lazy" {...props} />;
  }
  const alt = props.alt || props.title || '图片';
  // Archive images often have no dimensions; retain native img instead of next/image.
  return <ImageZoom src={props.src} alt={alt} title={props.title}>
    <img loading="lazy" {...props} alt={alt} />
  </ImageZoom>;
}
