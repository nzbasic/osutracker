import '../styles/globals.css'
import { Rubik  } from '@next/font/google';
import { Header } from 'ui';

const rubik = Rubik({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.className}>
      <head />
      <body id="root" className="flex flex-col subpixel-antialiased">
        <Header />
        {children}
      </body>
    </html>  
  );
}
