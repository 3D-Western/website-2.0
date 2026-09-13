import type { Metadata } from "next";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { chakraPetch, spaceGrotesk, ibmPlexMono } from "@/lib/fonts";
import { NavBar } from "@/components/navigation/NavBar";
import Footer from "@/components/Footer";

// global metadata for SEO, can be overridden by specific individual pages
export const metadata: Metadata = {
  title: "3DW Makerspace",
  description:
    "A student-run organization partnering with Morrissette Entrepreneurship to manage Western's makerspaces. From idea validation to product creation.",
  keywords: [
    "3D Printing",
    "Western University",
    "3D Western",
    "Engineering",
    "Western Printing Club",
  ],
  publisher: "3D Western",
  openGraph: {
    title: "3D Western",
    description: "Western University's Official 3D Printing Club",
    url: "https://3dwestern.ca",
    siteName: "3D Western",
    images: [
      {
        url: "https://3dwestern.ca/preview.png",
        width: 1200,
        height: 630,
        alt: "3D Western: Build Create Maker Space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Western",
    description: "Western University's Official 3D Printing Club",
    images: [
      {
        url: "https://3dwestern.ca/preview.png",
        width: 1200,
        height: 630,
        alt: "3D Western: Western University's Official 3D Printing Club",
      },
    ],
    //	creator: "@yourTwitterHandle", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a client component to access the router
  return (
    <html
      lang="en"
      className={`scroll-smooth overflow-x-hidden ${spaceGrotesk.variable} ${chakraPetch.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        <MenuProvider>
          <main className="min-h-screen w-full flex flex-col">
            <NavBar></NavBar>
            {children}
            <Footer />
          </main>
        </MenuProvider>
      </body>
    </html>
  );
}
