import { GetStaticPaths, GetStaticProps } from 'next';
import { Skill } from '@/types/Skill';
import { Text, Badge } from '@chakra-ui/react';
import Layout from '@/Layout';
import { fetchAPI } from '@/cmsApi';

interface Props {
  skill: Skill;
}

/**
 * SkillDetail page.
 * Displays detailed information about a specific skill.
 * Uses getStaticPaths and getStaticProps for static site and route generation.
 */
const SkillDetail = ({ skill }: Props) => {
  return (
    <Layout title={skill.title} backNav={{ title: 'Skills', link: '/skills' }}>
      <Text mb={4}>{skill.content}</Text>
      <Text fontWeight="bold">Technologies:</Text>
      {skill.technologies.map((tech, index) => (
        <Badge key={index}>{tech.name}</Badge>
      ))}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const skills = await fetchAPI<Skill[]>('/skills');
    const paths = skills.map((skill) => ({
      params: {
        slug: skill.slug,
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug;
    const skills = await fetchAPI<Skill[]>(
      `/skills?filters[slug][$eq]=${slug}&populate=technologies`,
    );
    const skill = skills[0];
    return {
      props: {
        skill,
      },
    };
  } catch (error) {
    console.error('Error fetching skill:', error);
    return {
      notFound: true,
    };
  }
};

export default SkillDetail;
