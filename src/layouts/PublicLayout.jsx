import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
