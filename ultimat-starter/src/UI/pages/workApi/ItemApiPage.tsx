import { LoaderFunctionArgs, useNavigation } from 'react-router';
import TodoApiItem from '@/feature/todoApi/item/TodoApiItem';
import { getTodoLoader } from '@/feature/todoApi/store/todoApiSlice';
import Loader from '@/UI/components/loader/Loader';

export default function ItemApiPage() {
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Loader />;
  }

  return <TodoApiItem />;
}

export function itemApiLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return getTodoLoader({ todoId: id! });
}
