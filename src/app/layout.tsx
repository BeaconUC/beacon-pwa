import type { Metadata } from "next";
import "./globals.css";
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Beacon - Smart Outage Manager",
  description: "Efficient outage reporting and dispatch system with GIS maps and real-time analytics for utilities.",
  keywords: ["outage", "utility", "dispatch", "GIS", "real-time", "analytics"],
  authors: [{ name: "Beacon Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
    <head>
        <meta name="apple-mobile-web-app-title" content="Beacon"/>
        <meta name="theme-color" content="#1976d2"/>
    </head>
    <body className={`antialiased`}>
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
