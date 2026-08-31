import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import '@/styles/main.scss'
import '@/styles/res.scss'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
// import { usePathname } from "next/navigation";
export const metadata = {
  title: "CTC Group",
  description: "CTC Group",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        <Navbar />
          <div className='main-content-container'>
            <PageWrapper >
              {children}
            </PageWrapper>
          </div>
        <Footer />
      </body>
    </html>
  );
}
