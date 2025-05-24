'use client';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';

import { openSnackbar } from 'api/snackbar';

// types
import { SnackbarProps } from 'types/snackbar';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthChangePassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        oldPassword: '',
        newPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        oldPassword: Yup.string().min(7).max(255).required('Old password is required'),
        newPassword: Yup.string().min(7).max(255).required('New password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);

          openSnackbar({
            open: true,
            message: 'Check mail for reset password link',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as SnackbarProps);

          setTimeout(() => {
            router.push('/check-mail');
          }, 1500);
        } catch (err: any) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-forgot"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  inputProps={{}}
                />
                <InputLabel htmlFor="old-password-forgot">Old Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  id="old-password-forgot"
                  type="password"
                  value={values.newPassword}
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter old password"
                  inputProps={{}}
                />
                <InputLabel htmlFor="new-password-forgot">New Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  id="new-password-forgot"
                  type="password"
                  value={values.newPassword}
                  name="oldPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  inputProps={{}}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-forgot">
                  {errors.email}
                </FormHelperText>
              )}
              {touched.oldPassword && errors.oldPassword && (
                <FormHelperText error id="helper-text-old-password-forgot">
                  {errors.oldPassword}
                </FormHelperText>
              )}
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="helper-text-new-password-forgot">
                  {errors.newPassword}
                </FormHelperText>
              )}
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Change Password
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
