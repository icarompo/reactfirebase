interface HeaderProps {
    title: string;
    subtitle: string;
  }
  
  function Header({title, subtitle}: HeaderProps): JSX.Element {
    return (
      <div className="div">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    );
  }

export default Header;