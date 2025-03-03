import React from 'react';
import { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>777 Tombala</title>
        <meta name="description" content="777 Tombala Game" />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <div className="video-background fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/LaQjJKTDtf0?autoplay=1&mute=1&controls=0&loop=1&playlist=LaQjJKTDtf0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
            title="Money Rain Background"
          ></iframe>
        </div>
        <div className="relative z-10 min-h-screen">
          <main className="container mx-auto py-8 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}