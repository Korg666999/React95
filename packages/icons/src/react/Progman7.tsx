import React from 'react';
import { IconProps } from '../iconType';
import { BaseIcon } from '../internal';
import Progman7_32x32_1 from '../../png/Progman7_32x32_1.png';
import Progman7_32x32_4 from '../../png/Progman7_32x32_4.png';

export const progman7Data = {
  '32x32_1': {
    imageSrc: Progman7_32x32_1 as string,
    width: 32,
    height: 32,
  },

  '32x32_4': {
    imageSrc: Progman7_32x32_4 as string,
    width: 32,
    height: 32,
  },
};

export interface Progman7Props extends IconProps {
  /**
   * Icon variant to use.
   * also provides default styling with the correct height and width
   **/
  variant?: '32x32_1' | '32x32_4';
}

export const Progman7: React.FC<Progman7Props> = ({
  variant = '32x32_1',
  ...rest
}) => {
  const image = progman7Data[variant];

  return (
    <BaseIcon
      width={image.width}
      height={image.height}
      src={image.imageSrc}
      {...rest}
    />
  );
};
