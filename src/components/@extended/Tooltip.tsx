// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import MuiTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

// project import
import getColors from 'utils/getColors';

// type
import { ColorProps } from 'types/extended';

// ==============================|| TOOLTIP - VARIANT ||============================== //

interface TooltipStyleProps {
  color?: ColorProps | string;
  labelColor?: ColorProps | string;
  theme: Theme;
}

function getVariantStyle({ color, theme, labelColor }: TooltipStyleProps) {
  const colors = getColors(theme, color as ColorProps);
  const { main, contrastText } = colors;
  let colorValue = color ? color : '';

  if (['primary', 'secondary', 'info', 'success', 'warning', 'error'].includes(colorValue)) {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        background: main,
        color: labelColor ? labelColor : contrastText
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: main
      }
    };
  } else {
    return {
      [`& .${tooltipClasses.tooltip}`]: {
        background: colorValue,
        color: labelColor ? labelColor : contrastText,
        boxShadow: theme.shadows[1]
      },
      [`& .${tooltipClasses.arrow}`]: {
        color: colorValue
      }
    };
  }
}

// ==============================|| STYLED - TOOLTIP COLOR ||============================== //

interface StyleProps {
  theme: Theme;
  arrow: TooltipProps['arrow'];
  labelColor?: ColorProps | string;
  color?: ColorProps | string;
}

const TooltipStyle = styled(({ className, ...props }: TooltipProps) => <MuiTooltip {...props} classes={{ popper: className }} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'labelColor'
})(({ theme, color, labelColor }: StyleProps) => ({
  ...(color && getVariantStyle({ color, theme, labelColor }))
}));

interface Props extends TooltipProps {
  arrow?: boolean;
  color?: ColorProps | string;
  labelColor?: ColorProps | string;
  children: TooltipProps['children'];
}

// ==============================|| EXTENDED - TOOLTIP ||============================== //

export default function CustomTooltip({ children, arrow = true, labelColor = '', ...rest }: Props) {
  const theme = useTheme();
  return (
    <TooltipStyle arrow={arrow} {...rest} theme={theme} labelColor={labelColor}>
      {children}
    </TooltipStyle>
  );
}
