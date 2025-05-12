import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

/**
 * NavBar component.
 * Displays the site header with navigation links.
 * Includes links to Home, Bio, and Skills pages.
 */
const NavBar = () => {
  return (
    <Box as="header" width="100%">
      <HStack
        as="nav"
        p={4}
        justifyContent="space-between"
        maxWidth="container.xl"
        margin="auto"
      >
        <Link href="/">
          <Text fontSize="xl" fontWeight="bold">
            Colin Eade
          </Text>
        </Link>
        <HStack spacing={4}>
          <Link href="/bio">
            <Button variant="link">Bio</Button>
          </Link>
          <Link href="/skills">
            <Button variant="link">Skills</Button>
          </Link>
          <Link href="/feedback">
            <Button variant="link">Feedback</Button>
          </Link>
        </HStack>
      </HStack>
      <Divider borderColor="gray.300" />
    </Box>
  );
};

export default NavBar;
