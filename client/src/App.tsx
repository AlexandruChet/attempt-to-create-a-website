import React, { useState } from "react";
import RegistrationOrAuthorization from "./pages/RegOrAuth";
import Header from "./components/Header";

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  if (!isAuthorized) {
    return (
      <div className="auth-fullscreen-wrapper">
        <RegistrationOrAuthorization onComplete={() => setIsAuthorized(true)} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <h1>Hello user</h1>
      </div>
    </div>
  );
};

export default App;
