interface FooterProps {
  allTasks: number;
  clearCompletedTasks: () => void;
  taskFilter: (status: string | boolean) => void;
}

const Footer = ({ allTasks, clearCompletedTasks, taskFilter }: FooterProps) => (
  <footer className="footer">
    <span className="todo-count">{allTasks} items left</span>
    <ul className="filters">
      <li>
        <button
          className="selected"
          onClick={() => {
            taskFilter("all");
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            taskFilter(false);
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            taskFilter(true);
          }}
        >
          Completed
        </button>
      </li>
    </ul>
    <button className="clear-completed" onClick={clearCompletedTasks}>
      Clear completed
    </button>
  </footer>
);

export default Footer;
