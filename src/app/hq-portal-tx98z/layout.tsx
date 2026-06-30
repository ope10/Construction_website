import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restricted Portal',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HQPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
