import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import TodoList from '@/feature/todo/list/TodoList';
import { logDir } from '@/utils/log';
import { Item, MOCK_ITEMS } from '@/utils/mocks/MockItems';

export default function WorkPage() {
  const items = useLoaderData<Item[][]>();
  logDir('data: ', items);
  return <TodoList />;
}

const LIMIT = 5;

function chunk<T>(array: T[]): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, LIMIT);
  const tail = array.slice(LIMIT);
  return [head, ...chunk(tail)];
}

export function itemsLoader({ params, request, context }: LoaderFunctionArgs) {
  logDir('params: ', params);
  logDir('request: ', request);
  logDir('context: ', context);

  return chunk<Item>(MOCK_ITEMS);
}
