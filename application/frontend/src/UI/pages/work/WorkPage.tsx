import Todo from '@/features/todo/Todo';

import classes from './WorkPage.module.scss';

export default function WorkPage() {
  return (
    <div className={classes.work}>
      <Todo />
    </div>
  );
}
