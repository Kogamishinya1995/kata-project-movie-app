import uniqueId from "lodash/uniqueId";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header.tsx";
import TodoApp from "./components/todoapp";

interface Task {
  id: string;
  text: string;

  done: boolean;
  created: number;
  edited: boolean;
}

const MyComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<number>(0);
  const [filtred, setFiltred] = useState<Task[]>(tasks);

  useEffect(() => {
    setFiltred(tasks);
  }, [tasks]);

  const handleNameChangeFunc = (taskText: string) => {
    setTasks((prevState) => [
      ...prevState,
      {
        id: uniqueId("task_"),
        text: taskText,
        done: false,
        created: Date.now(),
        edited: false,
      },
    ]);
    setAllTasks(allTasks + 1);
  };

  const toggleTask = (id: string) => {
    setTasks((currentTask) => {
      const updatedTasks = currentTask.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          done: !task.done,
        };
      });

      const activeTasksCount = updatedTasks.filter((task) => !task.done).length;
      setAllTasks(activeTasksCount);

      return updatedTasks;
    });
  };

  const editedModeOn = (id: string) => {
    setTasks((currentTask) =>
      currentTask.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          edited: true,
        };
      })
    );
  };

  const editedTask = (id: string, newText: string) => {
    setTasks((currentTask) =>
      currentTask.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          text: newText,
          edited: false,
        };
      })
    );
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);

      const activeTasksCount = updatedTasks.filter((task) => !task.done).length;
      setAllTasks(activeTasksCount);

      return updatedTasks;
    });
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => {
      const activeTasks = prevTasks.filter((task) => !task.done);
      setAllTasks(activeTasks.length);
      return activeTasks;
    });
  };

  const taskFilter = (status: "all" | boolean) => {
    const filteredTasks =
      status === "all"
        ? [...tasks]
        : tasks.filter((task) => task.done === status);
    setFiltred(filteredTasks);
  };

  return (
    <>
      <section className="todoapp">
        <Header handleNameChange={handleNameChangeFunc} />
        <section className="main">
          <TodoApp
            tasks={tasks}
            filtred={filtred}
            toggleTask={toggleTask}
            removeTask={removeTask}
            editedModeOn={editedModeOn}
            editedTask={editedTask}
          />
          <Footer
            allTasks={allTasks}
            clearCompletedTasks={clearCompletedTasks}
            taskFilter={taskFilter}
          />
        </section>
      </section>
    </>
  );
};

export default MyComponent;
