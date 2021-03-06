import React, { useState, useEffect } from 'react';
import useTodoListAtom from 'modules/useTodoListAtom';
import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';

const App = () => {
  const { todoList, loadTodoList } = useTodoListAtom();

  useEffect(() => {
    const data = localStorage.getItem('TODO_LIST');

    if (data) {
      loadTodoList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('TODO_LIST', JSON.stringify(todoList));
  }, [todoList]);

  const [filter, setFilter] = useState<Filter>('all');

  const filterTask = (category: string) => {
    if (category === 'active') {
      return todoList.filter(todo => todo.completed === false);
    }

    if (category === 'completed') {
      return todoList.filter(todo => todo.completed === true);
    }

    return todoList;
  };

  const filterTodoList = filterTask(filter);

  return (
    <section className="todoapp">
      <Header />
      <Main todoList={filterTodoList} />
      <Footer todoList={todoList} filter={filter} setFilter={setFilter} />
    </section>
  );
};

export default App;
