import { ubuntu } from "./fonts";
import "./globals.css";

//Slight metadata changes plus a font change
export const metadata = {
  title: "Consilium",
  description: "A task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
