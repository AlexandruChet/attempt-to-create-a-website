import Tasks from "../../entities/model/Task";
import GreetingTimer from "../../widgets/Greeting";
import MainComponent from "../../entities/model/SpeedTypingTest/window";

const TechProjects = () => {
  return (
    <>
      <GreetingTimer />
      <Tasks />
      <MainComponent/>
    </>
  );
};

export default TechProjects;
