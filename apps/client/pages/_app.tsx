import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-expect-error
  return <Component {...pageProps} />
}

export default MyApp
