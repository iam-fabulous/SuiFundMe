
import Navbar from "@/components/navbar";
import Providers from "../../components/providers";




export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Providers>
            <Navbar />
            {children}
        </Providers>
          
          
      </div>
  
  );
}
