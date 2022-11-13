import React from 'react';
import { IconProps } from '../iconType';
import { BaseIcon } from '../internal';
import FileTextSettings_32x32_4 from '../../png/FileTextSettings_32x32_4.png';
import FileTextSettings_16x16_4 from '../../png/FileTextSettings_16x16_4.png';

export const fileTextSettingsData = {
  '32x32_4': {
    imageSrc: FileTextSettings_32x32_4 as string,
    width: 32,
    height: 32,
  },

  '16x16_4': {
    imageSrc: FileTextSettings_16x16_4 as string,
    width: 16,
    height: 16,
  },
};

export interface FileTextSettingsProps extends IconProps {
  /**
   * Icon variant to use.
   * also provides default styling with the correct height and width
   **/
  variant?: '32x32_4' | '16x16_4';
}

export const FileTextSettings: React.FC<FileTextSettingsProps> = ({
  variant = '32x32_4',
  ...rest
}) => {
  const image = fileTextSettingsData[variant];

  return (
    <BaseIcon
      width={image.width}
      height={image.height}
      src={image.imageSrc}
      {...rest}
    />
  );
};
