import * as React from 'react';
import moment from 'moment';

export interface Todo {
  id: number;
  description: string;
  duedate: moment.Moment;
  state: string;
}

interface State {
  todos: Todo[];
  editTodo: Todo;
  isLoading: boolean;
}

export interface FilterState {
  duedate_filter: moment.Moment[];
  state_filter: string;
}

export const TodosContext = React.createContext<Partial<any>>({});

const TodosProvider: React.FunctionComponent = (props: any) => {
  const initialState: State = {
    todos: [],
    editTodo: null,
    isLoading: true,
  };

  const initialFiltersState: FilterState = {
    duedate_filter: [],
    state_filter: '',
  };

  const [state, setState] = React.useState<State>(initialState);
  const [isModalOpen, toggleModal] = React.useState<Boolean>(false);
  const [filters, setFilters] = React.useState<FilterState>(
    initialFiltersState,
  );

  const initializeTodoState = (payload: Todo[]) => {
    return setState({
      ...initialState,
      todos: initialState.todos.concat(payload),
      isLoading: false,
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

  const removeTodo = (id: number) => {
    return setState({
      ...state,
      todos: state.todos.filter((todo: Todo) => todo.id !== id),
    });
  };

  const toggleEditMode = (todo: Todo | null) => {
    return setState({
      ...state,
      editTodo: todo,
    });
  };

  const clearFilters = () => {
    setFilters(initialFiltersState);
  };

  return (
    <TodosContext.Provider
      value={{
        initializeTodoState,
        addTodo,
        removeTodo,
        updateTodos,
        toggleEditMode,
        toggleModal,
        isModalOpen,
        setFilters,
        filters,
        clearFilters,
        ...state,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
