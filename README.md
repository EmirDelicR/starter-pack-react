## This is just my options how to setup project



### Frontend

- React with TS

#### State managment

- Redux Toolkit with RTK Query
- FOr small projects - zustand 

#### Forms

- [Formik](https://formik.org/docs/overview) or [React Hook Form](https://react-hook-form.com/get-started)

#### Testing

- RTL 
- [Cypress](https://testing-library.com/docs/cypress-testing-library/intro/)

[Storybook](https://storybook.js.org/docs/react/get-started/introduction) UI testing and documentation tool


### Folder structure


```js
└── src/
    ├── features/
    │   │   # the todo "feature" contains everything related to todos
    │   ├── todos/
    │   │   │   # this is used to export the relevant modules aka the public API
    │   │   ├── index.ts
    │   │   ├── create-todo-form/
    │   │   ├── edit-todo-modal/
    │   │   ├── todo-form/
    │   │   └── todo-list/
    │   │       │   # the public API of the component (exports the todo-list component and hook)
    │   │       ├── index.js
    │   │       ├── todo-item.component.ts
    │   │       ├── todo-list.component.ts
    │   │       ├── todo-list.context.ts
    │   │       ├── todo-list.test.ts
    │   │       └── use-todo-list.ts
    │   ├── projects/
    │   │   ├── index.ts
    │   │   ├── create-project-form/
    │   │   └── project-list/
    │   ├── ui/
    │   │   ├── index.ts
    │   │   ├── button/
    │   │   ├── card/
    │   │   ├── checkbox/
    │   │   ├── header/
    │   │   ├── footer/
    │   │   ├── modal/
    │   │   └── text-field/
    │   └── users/
    │       ├── index.ts
    │       ├── login/
    │       ├── signup/
    │       └── use-auth.ts
    └── pages/
        │   # all that's left in the pages folder are simple JS files
        │   # each file represents a page (like Next.js)
        ├── create-project.ts
        ├── create-todo.ts
        ├── index.ts
        └── login.ts

 ```

 index.ts file

```js 
// features/todo/todo-list
export { TodoList } from "./todo-list.component";
export { useTodoList } from "./use-todo-list";

// feature/todo/index.js 
export * from "./create-todo-form";
export * from "./todo-list";

// import in places
import { TodoList } from "@features/todo";

```
