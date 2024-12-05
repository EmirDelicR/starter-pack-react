import { LoaderFunctionArgs } from 'react-router';
import TodoItem from '@/feature/todo/item/TodoItem';
import { MOCK_ITEMS } from '@/utils/mocks/MockItems';

export default function ItemPage() {
  return <TodoItem />;
}

export function itemLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return MOCK_ITEMS.find((item) => item.id === id)!;
}
