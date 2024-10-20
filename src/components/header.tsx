interface HeaderProps {
  handleNameChange: (task: string) => void;
}

const Header = ({ handleNameChange }: HeaderProps) => {
  const keyDownFunction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNameChange(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={keyDownFunction}
      />
    </header>
  );
};

export default Header;
