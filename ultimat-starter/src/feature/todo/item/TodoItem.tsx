import { IconBriefcase } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Group, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { MockData } from '../store/MockData';

export default function TodoItem() {
  const { id } = useParams();
  const item = MockData.find((item) => item.id === id)!;

  return (
    <Paper pos="relative" m="xl">
      <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Flex direction="column" gap="lg">
        <Title order={2}>
          <Group>
            <IconBriefcase />
            {item.title}
          </Group>
        </Title>
        <Box>
          <Title order={4}>Description:</Title>
          <Text>{item.description}</Text>
        </Box>
        <Box>
          <Title order={4}>ID:</Title>
          <Text>{item.id}</Text>
        </Box>
      </Flex>
    </Paper>
  );
}
