import { ReactNode } from 'react';
import Head from 'next/head';
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';

interface Props {
  children: ReactNode;
  backNav?: {
    title: string;
    link: string;
  };
  title?: string;
}

/**
 * Layout component that wraps all pages.
 * Provides header, footer, and optional back navigation.
 */
const Layout = ({ children, backNav, title }: Props) => {
  const fullTitle = title ? `Colin Eade - ${title}` : 'Colin Eade';

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta
          name="description"
          content="Simple static web app for Web Development - Frameworks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack minHeight="100vh" spacing={4}>
        <NavBar />
        <Container as="main" maxW="container.xl" flex={1}>
          {backNav && (
            <>
              <Link href={backNav.link}>
                <Button mb={4} variant="link">
                  <ChevronLeftIcon /> {backNav.title}
                </Button>
              </Link>
              <Heading mb={4}>{title}</Heading>
            </>
          )}
          {children}
        </Container>
        <Footer />
      </VStack>
    </>
  );
};

export default Layout;
