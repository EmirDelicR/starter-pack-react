import { LoaderFunctionArgs } from 'react-router';
import TodoApiList from '@/feature/todoApi/list/TodoApiList';
import { getPaginatedTodosLoader } from '@/feature/todoApi/store/todoApiSlice';

export default function WorkApiPage() {
  return <TodoApiList />;
}

export function itemsApiLoader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page');
  return getPaginatedTodosLoader({ page: Number(page || 1) });
}
