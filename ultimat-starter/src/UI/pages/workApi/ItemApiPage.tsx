import { LoaderFunctionArgs, useNavigation } from 'react-router';
import TodoItem from '@/feature/todo/item/TodoItem';
import { getTodoLoader } from '@/feature/todoApi/store/todoApiSlice';
import Loader from '@/UI/components/loader/Loader';

export default function ItemApiPage() {
  const navigation = useNavigation();

  // if (navigation.state === 'loading') {
  //   return <CustomLoader />;
  // }

  return <TodoItem />;
}

export function itemApiLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return getTodoLoader({ todoId: id! });
}
