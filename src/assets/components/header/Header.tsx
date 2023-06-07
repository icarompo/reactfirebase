import './styles.css';

interface HeaderProps {
    title: string;
    subtitle: string;
  }
  
  function Header({title, subtitle}: HeaderProps): JSX.Element {
    return (
      <div className="header">
          <img src="https://irbcontas.org.br/wp-content/uploads/2020/03/associado-titular-logo-tce-to.png" alt="Logo do TCE-TO" className="logo"/>
        <div className="text-container">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    );
  }

export default Header;