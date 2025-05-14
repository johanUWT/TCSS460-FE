// material-ui
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={2}
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        <Typography variant="subtitle2" color="secondary">
          For educational use only
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} textAlign={{ xs: 'center', sm: 'inherit' }}>
          <Link href="https://www.tacoma.uw.edu/" target="_blank" variant="caption" color="text.secondary">
            University of Washington Tacoma
          </Link>
          <Link href="https://www.tacoma.uw.edu/set" target="_blank" variant="caption" color="text.secondary">
            School of Engineering and Technology
          </Link>
          <Link
            href="https://www.tacoma.uw.edu/set/css-elective-course-descriptions"
            target="_blank"
            variant="caption"
            color="text.secondary"
          >
            TCSS 460
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
