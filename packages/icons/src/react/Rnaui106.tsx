import React from 'react';
import { IconProps } from '../iconType';
import { BaseIcon } from '../internal';
import Rnaui106_32x32_4 from '../../png/Rnaui106_32x32_4.png';

export const rnaui106Data = {
  '32x32_4': {
    imageSrc: Rnaui106_32x32_4 as string,
    width: 32,
    height: 32,
  },
};

export interface Rnaui106Props extends IconProps {
  /**
   * Icon variant to use.
   * also provides default styling with the correct height and width
   **/
  variant?: '32x32_4';
}

export const Rnaui106: React.FC<Rnaui106Props> = ({
  variant = '32x32_4',
  ...rest
}) => {
  const image = rnaui106Data[variant];

  return (
    <BaseIcon
      width={image.width}
      height={image.height}
      src={image.imageSrc}
      {...rest}
    />
  );
};
