import { useState } from 'react';
import '/src/assets/styles/css/App.css';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps): JSX.Element {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function MainPage(){

return (
  <>
    <Header title="Header"/>
  </>
  );
}

export default MainPage;