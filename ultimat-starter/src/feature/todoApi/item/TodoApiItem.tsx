import { IconBriefcase } from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import { Box, Flex, Group, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { Item } from '@/utils/mocks/MockItems';

export default function TodoItem() {
  const item = useLoaderData<Item>();

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
