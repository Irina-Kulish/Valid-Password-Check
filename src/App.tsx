import React from 'react';
import './index.css';
import { Header } from './components/Header/Header';
import { PasswordValidator } from './components/PasswordValidator/PasswordValidator';

const App: React.FC = () => {
  return (
    <div className="App relative bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg">
          <PasswordValidator />
        </div>
      </div>
    </div>
  );
};

export default App;
