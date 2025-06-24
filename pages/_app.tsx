import GlobalStyle from '@/styles/global-styles';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from '@/styles/theme';
import Layout from '@/layout/Layout';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath || '');
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  useEffect(() => {
    storePathValues();
  }, [router.asPath]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}
