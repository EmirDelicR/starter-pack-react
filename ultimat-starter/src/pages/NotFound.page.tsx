import { useNavigate } from 'react-router-dom';
import { Button, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core';

export function NotFoundPage() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container>
      <Stack align="center" justify="center" mih="80vh">
        <Title>Something is not right...</Title>
        <Text c="dimmed" size="lg">
          Page you are trying to open does not exist. You may have mistyped the address, or the page
          has been moved to another URL. If you think this is an error contact support.
        </Text>
        <Button variant="outline" size="md" mt="xl" onClick={goToHomePage}>
          Get back to home page
        </Button>
      </Stack>
    </Container>
  );
}
