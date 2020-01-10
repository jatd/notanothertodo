import * as React from 'react';
import moment from 'moment';

export interface Todo {
  id: string;
  description: string;
  duedate: moment.Moment;
  state: string;
}

interface State {
  todos: Todo[];
}

export const TodosContext = React.createContext<Partial<any>>({});

const TodosProvider: React.FunctionComponent = (props: any) => {
  const initialState: State = { todos: [] };
  const [state, setState] = React.useState<State>(initialState);

  const initializeTodoState = (payload: Todo[]) => {
    return setState({
      ...initialState,
      todos: initialState.todos.concat(payload),
    });
  };

  const addTodo = (todo: Todo) => {
    const { todos } = state;
    return setState({
      ...state,
      todos: todos.concat([todo]),
    });
  };

  const updateTodos = (todo: Todo) => {
    const { todos } = state;
    const { id } = todo;
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    todos[index] = todo;
    return setState({
      ...state,
      todos,
    });
  };

  const removeTodo = (id: string) => {
    return setState({
      ...state,
      todos: state.todos.filter((todo: Todo) => todo.id !== id),
    });
  };

  return (
    <TodosContext.Provider
      value={{
        initializeTodoState,
        addTodo,
        removeTodo,
        updateTodos,
        todos: state.todos,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
