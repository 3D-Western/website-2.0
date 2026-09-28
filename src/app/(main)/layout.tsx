import type { Metadata } from "next";
import "./globals.css";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { MenuProvider } from "@/context/MenuContext";
import { inter, spaceGrotesk } from "@/lib/fonts";

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
    icon: "/logo.ico",
    shortcut: "/logo.ico", // TODO: replace with new logo.png if needed; otherwise stick to favicon
    apple: "/logo.ico",
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
      className={`scroll-smooth overflow-x-hidden ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <MenuProvider>
          <LoadingWrapper>{children}</LoadingWrapper>
        </MenuProvider>
      </body>
    </html>
  );
}
