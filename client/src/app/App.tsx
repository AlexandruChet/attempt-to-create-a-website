import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationOrAuthorization from "../pages/RegOrAuth";
import Header from "../widgets/Header";
import Home from "../pages/Home";
import TechProjects from "../pages/Projects";
import "./styles/index.css";


const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  return (
    <Router>
      {isAuthorized && <Header />}

      <Routes>
        <Route
          path="/login"
          element={
            !isAuthorized ? (
              <RegistrationOrAuthorization
                onComplete={() => setIsAuthorized(true)}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/"
          element={isAuthorized ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/more_information"
          element={
            isAuthorized ? <div>Hello User</div> : <Navigate to="/login" />
          }
        />

        <Route
          path="/about_me"
          element={
            isAuthorized ? <div>About Me</div> : <Navigate to="/login" />
          }
        />

        <Route
          path="/tech_skills"
          element={isAuthorized ? <TechProjects /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthorized ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
