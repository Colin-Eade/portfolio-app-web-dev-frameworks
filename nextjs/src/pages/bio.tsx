import { Bio as BioType } from '@/types/Bio';
import { Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Layout from '@/Layout';
import { fetchAPI } from '@/cmsApi';

interface Props {
  bio: BioType;
}

/**
 * Bio page.
 * Displays bio info paragraphs fetched from a JSON file.
 * Uses getStaticProps for static site generation.
 */
const Bio = ({ bio }: Props) => {
  return (
    <Layout title="Bio" backNav={{ title: 'Home', link: '/' }}>
      {bio.paragraphs.map((paragraph) => (
        <Text as="p" mb={4} key={paragraph.children[0].text}>
          {paragraph.children[0].text}
        </Text>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const bio = await fetchAPI<BioType>('/bio');
    return {
      props: {
        bio,
      },
    };
  } catch (error) {
    console.error('Error fetching bio:', error);
    return {
      notFound: true,
    };
  }
};

export default Bio;
