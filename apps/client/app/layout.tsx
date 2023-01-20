import '../styles/globals.css'
import { Inter, Poppins } from '@next/font/google';
import { Header } from 'ui';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body id="root" className="flex flex-col subpixel-antialiased">
        <Header />
        {children}
      </body>
    </html>  
  );
}
