import { IconInfoCircle } from '@tabler/icons-react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import {
  Flex,
  List,
  ListItem,
  LoadingOverlay,
  Pagination,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Item } from '@/utils/mocks/MockItems';

export default function TodoList() {
  const data = useLoaderData<Item[][]>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const onChange = (p: number) => {
    searchParams.set('page', `${p}`);
    setSearchParams(searchParams);
  };

  const navigateToItemDetails = (id: string) => () => {
    navigate(`/work/${id}`);
  };

  return (
    <Paper pos="relative" m="xl">
      <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Flex direction="column" align="center" gap="lg">
        <List
          spacing="xs"
          size="sm"
          icon={
            <ThemeIcon bg="none" variant="light">
              <IconInfoCircle />
            </ThemeIcon>
          }
        >
          {data[currentPage - 1]?.map((item) => (
            <ListItem
              data-testid="list-item"
              key={item.id}
              maw="600px"
              style={{
                border: '1px solid lightblue',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={navigateToItemDetails(item.id)}
            >
              <Title order={3}>
                {item.id} : {item.title}
              </Title>
              <Text>{item.description}</Text>
            </ListItem>
          ))}
        </List>
        <Pagination total={2} value={currentPage} onChange={onChange} mt="sm" />
      </Flex>
    </Paper>
  );
}
