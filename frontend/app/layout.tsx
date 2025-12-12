import './globals.css';

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="your-classes-here"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}