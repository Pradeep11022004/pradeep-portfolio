import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata = {
 title: 'Pradeep K | Java Full Stack Developer',
  description:
    'Portfolio of Pradeep K, a Java Full Stack Developer skilled in Java, Spring Boot, React, and MySQL.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
        </body>
    </html>
  );
}