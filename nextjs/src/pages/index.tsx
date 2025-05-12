import Layout from '@/Layout';
import { VStack, Heading, Text, HStack, Button } from '@chakra-ui/react';
import Link from 'next/link';

/**
 * Home page.
 * Displays a centered introduction with links to Bio and Skills pages.
 */
const Index = () => {
  return (
    <Layout title="Home">
      <VStack spacing={4} align="center" textAlign="center" pt="25vh">
        <Heading size="4xl" fontWeight="bold">
          Colin Eade
        </Heading>
        <Text fontSize="xl">
          Computer Programming and Analysis Student at Durham College
        </Text>
        <HStack spacing="4">
          <Link href="/bio">
            <Button variant="link" fontSize="xl">
              Bio
            </Button>
          </Link>
          <Link href="/skills">
            <Button variant="link" fontSize="xl">
              Skills
            </Button>
          </Link>
          <Link href="/feedback">
            <Button variant="link" fontSize="xl">
              Feedback
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Index;
