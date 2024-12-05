import { LoaderFunctionArgs } from 'react-router';
import TodoItem from '@/feature/todo/item/TodoItem';
import { MOCK_ITEMS } from '@/utils/mocks/MockItems';

export default function ItemApiPage() {
  return <TodoItem />;
}

export function itemApiLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return MOCK_ITEMS.find((item) => item.id === id)!;
}
