

import NavbarMobile from "@/components/shared/NavbarMobile"
import Sidebar from "@/components/shared/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <NavbarMobile/>

      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      
      {/* <Toaster /> */}
    </main>
  )
}

export default Layout