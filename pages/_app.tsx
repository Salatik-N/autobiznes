import { AppContext, AppInitialProps } from 'next/app'
import App from 'next/app'
import localFont from 'next/font/local'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { AuthProvider } from '../lib/use-authorization'
import Layout from '../components/Layout'
import '../styles/index.scss'

const interFont = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

function MyApp({ Component, pageProps }: AppContext & AppInitialProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <Layout>
            <main className={interFont.className}>
              <Component {...pageProps} />
            </main>
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
