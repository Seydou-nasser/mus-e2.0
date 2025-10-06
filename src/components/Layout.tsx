import Footer from "./Footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex" style={{ marginBottom: "3.5rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
