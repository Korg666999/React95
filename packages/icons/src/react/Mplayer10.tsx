import React from 'react';
import { IconProps } from '../iconType';
import { BaseIcon } from '../internal';
import Mplayer10_32x32_4 from '../../png/Mplayer10_32x32_4.png';
import Mplayer10_16x16_4 from '../../png/Mplayer10_16x16_4.png';

export const mplayer10Data = {
  '32x32_4': {
    imageSrc: Mplayer10_32x32_4 as string,
    width: 32,
    height: 32,
  },

  '16x16_4': {
    imageSrc: Mplayer10_16x16_4 as string,
    width: 16,
    height: 16,
  },
};

export interface Mplayer10Props extends IconProps {
  /**
   * Icon variant to use.
   * also provides default styling with the correct height and width
   **/
  variant?: '32x32_4' | '16x16_4';
}

export const Mplayer10: React.FC<Mplayer10Props> = ({
  variant = '32x32_4',
  ...rest
}) => {
  const image = mplayer10Data[variant];

  return (
    <BaseIcon
      width={image.width}
      height={image.height}
      src={image.imageSrc}
      {...rest}
    />
  );
};