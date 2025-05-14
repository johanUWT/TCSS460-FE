import { ReactNode } from 'react';

// material-ui
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// ==============================|| PROGRESS - LINEAR ICON ||============================== //

export default function LinearWithIcon({ icon, value, ...others }: LinearProgressProps & { icon: ReactNode }) {
  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>{icon}</Box>
    </Stack>
  );
}
