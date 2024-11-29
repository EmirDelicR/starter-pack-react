import { IconInfoCircle } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { MockData } from '../store/MockData';

const LIMIT = 5;

function chunk<T>(array: T[]): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, LIMIT);
  const tail = array.slice(LIMIT);
  return [head, ...chunk(tail)];
}

const data = chunk(MockData);

export default function TodoList() {
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
        <Pagination
          total={MockData.length / LIMIT}
          value={currentPage}
          onChange={onChange}
          mt="sm"
        />
      </Flex>
    </Paper>
  );
}
