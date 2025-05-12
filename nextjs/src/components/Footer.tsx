import { HStack, Text, Button, Link, Box, Divider } from '@chakra-ui/react';

/**
 * Footer component.
 * Displays the site footer with external links.
 * Includes links to GitHub and LinkedIn profiles.
 */
const Footer = () => {
  return (
    <Box as="footer" width="100%">
      <Divider borderColor="gray.300" />
      <HStack
        p={4}
        justifyContent="space-between"
        maxWidth="container.xl"
        margin="auto"
      >
        <Text fontSize="sm">Colin Eade</Text>
        <HStack spacing={4}>
          <Link href="https://github.com/colin-eade" isExternal>
            <Button variant="link" fontSize="sm">
              GitHub
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/colin-eade" isExternal>
            <Button variant="link" fontSize="sm">
              LinkedIn
            </Button>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Footer;
