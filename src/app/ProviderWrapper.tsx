'use client';

import { ReactElement } from 'react';

// next
import { SessionProvider } from 'next-auth/react';

// project import
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper({ children }: { children: ReactElement }) {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <SessionProvider refetchInterval={0}>
            <Notistack>
              <Snackbar />
              {children}
            </Notistack>
          </SessionProvider>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  );
}
