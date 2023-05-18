import { ChangeEvent, useMemo, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import {
  Button,
  Checkbox,
  Error,
  Header,
  Input,
  Loader
} from '@/UI/components';
import { Pagination } from '@/UI/elements';
import { ITEMS_PER_PAGE } from '@/constants/api';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/store/userSlice/userStoreSlice';
import { InputData, onInputChange } from '@/utils';

import classes from './Todo.module.scss';
import {
  ITodo,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetPaginatedTodosQuery,
  useUpdateTodoMutation
} from './todoStore';

function CreateTodo() {
  const userId = useAppSelector(selectUserId);
  const [newTodo, setNewTodo] = useState<InputData>({
    value: '',
    isValid: false
  });
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({ userId, title: newTodo.value });
    setNewTodo({ value: '', isValid: false });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value, setNewTodo);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input label="Enter new todo" value={newTodo.value} onChange={onChange} />
      <Button
        isDisabled={!newTodo.isValid}
        size="large"
        type="submit"
        className="submit"
      >
        Submit
      </Button>
    </form>
  );
}

function TodoItem({ todo }: { todo: ITodo }) {
  const userId = useAppSelector(selectUserId);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const onUpdateHandler = () =>
    updateTodo({ ...todo, completed: !todo.completed });
  const onDeleteHandler = () => deleteTodo({ todoId: todo.id, userId });

  return (
    <article key={todo.id} className={classes.todo}>
      <p className={classes.title}>{todo.title}</p>

      <div className={classes.cta}>
        <Checkbox
          id={`${todo.id}`}
          isChecked={todo.completed}
          name="todo-checkbox"
          onChange={onUpdateHandler}
        />

        <Button size="icon" onClick={onDeleteHandler}>
          <BsTrash role="delete-icon" />
        </Button>
      </div>
    </article>
  );
}

function TodoList() {
  const userId = useAppSelector(selectUserId);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobileView = useMediaQuery();
  const { data, isLoading, isSuccess, isError, error } =
    useGetPaginatedTodosQuery({
      userId,
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      isMobile: isMobileView
    });

  const content = useMemo(() => {
    if (!isSuccess) {
      return null;
    }
    const { items, numberOfPages } = data;

    if (items && items.length > 0) {
      return items.map((todo: ITodo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      });
    }

    // This is in case that user delete last item on page
    if (items.length === 0 && numberOfPages > 0) {
      setCurrentPage((prev) => prev - 1);
    }

    return <p>Currently there is no data.</p>;
  }, [data, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error isError={isError} error={error} />;
  }

  const { numberOfPages } = data!;

  return (
    <div className={classes.content}>
      {content}
      <Pagination
        numberOfPages={numberOfPages}
        pageSetter={setCurrentPage}
        currentPage={currentPage}
        isNextDisabled={currentPage === numberOfPages - 1}
        isPreviousDisabled={currentPage === 0}
        isMobile={isMobileView}
      />
    </div>
  );
}

export default function Todo() {
  return (
    <div className={classes.todo}>
      <div className={classes.wrapper}>
        <Header headline="Manage tasks" dataColor="light" />
        <CreateTodo />
      </div>
      <div className={classes.wrapper}>
        <TodoList />
      </div>
    </div>
  );
}
