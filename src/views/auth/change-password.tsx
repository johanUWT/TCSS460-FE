// next
import NextLink from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthChangePassword from 'sections/auth/auth-forms/AuthChangePassword';

// ================================|| FORGOT PASSWORD ||================================ //

export default function ChangePassword() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Change Password</Typography>
            <NextLink href="/login" passHref legacyBehavior>
              <Link variant="body1" color="primary">
                Back to Login
              </Link>
            </NextLink>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthChangePassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
