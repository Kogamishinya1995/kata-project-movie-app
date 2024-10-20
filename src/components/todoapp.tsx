import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";

interface Task {
  id: string;
  text: string;
  done: boolean;
  created: number;
  edited: boolean;
}

interface TodoAppProps {
  tasks: Task[];
  filtered: Task[];
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  editedModeOn: (id: string) => void;
  editedTask: (id: string, newText: string) => void;
}

const TodoApp: React.FC<TodoAppProps> = ({
  filtered,
  toggleTask,
  removeTask,
  editedModeOn,
  editedTask,
}) => (
  <ul className="todo-list">
    {filtered.map((task) => {
      const liClasses = classNames({
        completed: task.done,
        editing: task.edited,
      });

      return (
        <li key={task.id} className={liClasses}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={task.done}
              onChange={() => {
                toggleTask(task.id);
              }}
            />
            <label>
              <span className="description">{task.text}</span>
              <span className="created">
                {`created ${formatDistanceToNow(new Date(task.created), { addSuffix: true })}`}
              </span>
            </label>
            <button
              className="icon icon-edit"
              onClick={() => {
                editedModeOn(task.id);
              }}
            ></button>
            <button
              className="icon icon-destroy"
              onClick={() => {
                removeTask(task.id);
              }}
            ></button>
          </div>
          {task.edited ? (
            <input
              type="text"
              className="edit"
              defaultValue={task.text}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  editedTask(task.id, event.currentTarget.value);
                }
              }}
            />
          ) : null}
        </li>
      );
    })}
  </ul>
);

export default TodoApp;
