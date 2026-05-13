import { Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Topline } from "./components/Topline";
import { CategoryPageView } from "./pages/CategoryPageView";
import { HomePage } from "./pages/HomePage";
import styles from "./App.module.css";

export function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={styles.page}>
      <Topline />
      <SiteHeader />
      <main className={isHome ? styles.mainHome : styles.mainDefault}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPageView />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
