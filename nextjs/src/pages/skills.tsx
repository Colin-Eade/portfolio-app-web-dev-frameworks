import { GetStaticProps } from 'next';
import { useState, useMemo } from 'react';
import { Skill } from '@/types/Skill';
import Layout from '@/Layout';
import { fetchAPI } from '@/cmsApi';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Badge,
  Button,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SkillSummary from '@/components/SkillSummary';
import { Technology } from '@/types/Technology';

interface Props {
  skills: Skill[];
  technologies: Technology[];
}

const Skills = ({ skills, technologies }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleTech = (techName: string) => {
    setSelectedTechs((prev) =>
      prev.includes(techName)
        ? prev.filter((t) => t !== techName)
        : [...prev, techName],
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
    setSearchTerm('');
  };

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.every((tech) =>
          skill.technologies.some((t) => t.name === tech),
        );

      return matchesSearch && matchesTech;
    });
  }, [skills, searchTerm, selectedTechs]);

  const hasActiveFilters = searchTerm || selectedTechs.length > 0;

  return (
    <Layout title="Skills" backNav={{ title: 'Home', link: '/' }}>
      {/* Search and Clear Filters */}
      <HStack mb={4} spacing={4}>
        <InputGroup size="md" maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={handleSearchChange}
            borderRadius="full"
          />
        </InputGroup>
        {hasActiveFilters && (
          <Button size="sm" variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </HStack>

      {/* Technology Filters */}
      <Box mb={6}>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Filter by technology:
        </Text>
        <Wrap spacing={2}>
          {technologies.map((tech) => (
            <WrapItem key={tech.id}>
              <Badge
                as="button"
                colorScheme={
                  selectedTechs.includes(tech.name) ? 'blue' : 'gray'
                }
                cursor="pointer"
                onClick={() => toggleTech(tech.name)}
                _hover={{
                  opacity: 0.8,
                }}
              >
                {tech.name}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* Skills Grid */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <SkillSummary key={skill.slug} skill={skill} />
          ))
        ) : (
          <Box>
            <Text>No skills match your search criteria.</Text>
          </Box>
        )}
      </SimpleGrid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const skills = await fetchAPI<Skill[]>('/skills?populate=technologies');
    const technologies = await fetchAPI<Technology[]>('/technologies');

    return {
      props: { skills, technologies },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { skills: [], technologies: [] },
    };
  }
};

export default Skills;
