import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-1">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
