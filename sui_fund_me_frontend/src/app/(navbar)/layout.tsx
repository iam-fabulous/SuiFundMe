
// import Navbar from "../../components/navbar";
// import Providers from "../../components/providers";




// export default function layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div>
//         <Providers>
//             <Navbar />
//             <main className="pt-20">
//                 {children}
//             </main>
//         </Providers>


//       </div>
  
//   );
// }

"use client";


import Providers from '../../components/providers'
import { ProjectProvider } from '@/components/contexts/project-contexts'
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })
export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <Providers>
      <ProjectProvider>
        <div className={inter.className}>
          <Navbar />
          <main className="pt-10">{children}</main>
        </div>
      </ProjectProvider>
    </Providers>
  )
}
