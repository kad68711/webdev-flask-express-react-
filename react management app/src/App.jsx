import { useState } from "react";
import Addproject from "./Components/Addproject";
import Project from "./Components/Project";
import Sidebar from "./Components/Sidebar";
import NoprojectSelected from "./Components/Noprojectselected";

function App() {
  const [projectstate, setProjectstate] = useState({
    selectedproject_id: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddtask(text) {
    setProjectstate((prevvalue) => {
      const newtask={
        text:text,
        projectid:prevvalue.selectedproject_id,
        id:Math.random(),
      }
      return {
        ...prevvalue,
        
       tasks:[newtask,...prevvalue.tasks]
      };
    });
  }
  function handleDeletetask(id) {
    setProjectstate((prevvalue) => {
      return {
        ...prevvalue,
        
        tasks: prevvalue.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });

  }
  function handleselectproject(id) {
    setProjectstate((prevvalue) => {
      return {
        ...prevvalue,
        selectedproject_id: id,
      };
    });
  }

  function handledeleteproject() {
    setProjectstate((prevvalue) => {
      return {
        ...prevvalue,
        selectedproject_id: undefined,
        projects: prevvalue.projects.filter(
          (project) => project.id !== prevvalue.selectedproject_id
        ),
      };
    });
  }

  function handleaddproject(newprojectdata) {
    setProjectstate((prevvalue) => {
      return {
        ...prevvalue,
        selectedproject_id: undefined,
        projects: [
          ...prevvalue.projects,
          { ...newprojectdata, id: Math.random() },
        ],
      };
    });
  }

  function showaddproject() {
    setProjectstate((prevvalue) => {
      return { ...prevvalue, selectedproject_id: null };
    });
  }

  const selectedproject = projectstate.projects.find(
    (project) => project.id == projectstate.selectedproject_id
  );

  let content = (
    <Project
      project={selectedproject}
      ondelete={handledeleteproject}
      onaddtask={handleAddtask}
      ondeletetask={handleDeletetask}

      tasks={projectstate.tasks}
    />
  );

  if (projectstate.selectedproject_id === null) {
    content = <Addproject addproject={handleaddproject} />;
  } else if (projectstate.selectedproject_id === undefined) {
    content = <NoprojectSelected showaddproject={showaddproject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={projectstate.projects}
        showaddproject={showaddproject}
        onselectproject={handleselectproject}
        selectedproject_id={projectstate.selectedproject_id}
      />
      {content}
    </main>
  );
}

export default App;
