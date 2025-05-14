// project import
import Default from './default';

import { ThemeMode } from 'config';

// assets
import { PalettesProps } from '@ant-design/colors';

// types
import { PaletteThemeProps } from 'types/theme';
import { PresetColor } from 'types/config';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

export default function Theme(colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps {
  return Default(colors);
}
