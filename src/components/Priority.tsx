import Avatar from '@mui/material/Avatar';
import { yellow, red, green } from '@mui/material/colors';

export default function PriorityAvatar({ priority }: { priority: number }) {
  const priorityColors = [green[800], yellow[800], red[800]];

  return (
    <Avatar sx={{ bgcolor: priorityColors[priority - 1] }} variant="rounded">
      {priority}
    </Avatar>
  );
}
