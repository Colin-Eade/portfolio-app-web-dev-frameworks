import { Skill } from '@/types/Skill';
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  skill: Skill;
}

/**
 * SkillSummary component.
 * Displays a card with a summary of a skill.
 * Includes skill title, summary, technologies, and a link to detailed view.
 */
const SkillSummary = ({ skill }: Props) => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <Heading size="md">{skill.title}</Heading>
          <Text>{skill.summary}</Text>
          <Box>
            <Text fontWeight="bold" mb={2}>
              Technologies:
            </Text>
            {skill.technologies.map((tech, index) => (
              <Badge key={index}>{tech.name}</Badge>
            ))}
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={`/skills/${skill.slug}`}>
          <Button>View More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SkillSummary;
