import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import PriorityAvatar from '../components/Priority';

export default function PrioritySelector({
  initialValue,
  onClick
}: {
  initialValue: number;
  onClick: (event: React.MouseEvent<HTMLElement>, newPriority: number) => void;
}) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <ToggleButtonGroup exclusive value={initialValue} onChange={onClick}>
        <ToggleButton value={1}>
          <PriorityAvatar priority={1} />
        </ToggleButton>
        <ToggleButton value={2}>
          <PriorityAvatar priority={2} />
        </ToggleButton>
        <ToggleButton value={3}>
          <PriorityAvatar priority={3} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
