// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">For educational use only</Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link href="https://www.tacoma.uw.edu/" target="_blank" variant="caption" color="text.primary">
          University of Washington Tacoma
        </Link>
        <Link href="https://www.tacoma.uw.edu/set" target="_blank" variant="caption" color="text.primary">
          School of Engineering and Technology
        </Link>
        <Link href="https://www.tacoma.uw.edu/set/css-elective-course-descriptions" target="_blank" variant="caption" color="text.primary">
          TCSS 460
        </Link>
      </Stack>
    </Stack>
  );
}
