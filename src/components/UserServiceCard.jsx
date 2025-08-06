import React, { useState, useEffect ,useContext} from 'react';
import UserNavbar from './UserNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
// import AddEmpolyee from './AddEmpolyee';
// import EmpolyeeCard from './EmpolyeeCard';
// import AddProject from './AddProject';
// import ProjectsCard from './ProjectsCard';
import AddTask from './AddTask';
import AllTasks from './AllTasks';

function UserServiceCard() {
  const{userData}= useContext(AppContext);
  const [buttonIndex, setButtonIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { label: "All Task", path: "projects" },
    { label: "Add Task", path: "employees" },
  
  ];

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');

    const index = buttons.findIndex(btn => btn.path === tab);
    if (index !== -1) {
      setButtonIndex(index);
    }
  }, [location.search]);

  const handleTabClick = (index) => {
    const path = buttons[index].path;
    setButtonIndex(index);
    navigate(`?tab=${path}`);
  };

 

  return (
    <>
      <UserNavbar />

      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="d-flex flex-column p-3 border-end position-fixed bg-light"
          style={{
            width: "250px",
            height: "calc(100vh - 56px)",
            top: "56px",
            left: 0,
            zIndex: 1040,
          }}
        >
         <h5 className="text-success fw-bold mb-3">User Panel</h5>

          {buttons.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index)}
              className={`d-flex align-items-center mb-2 px-3 py-2 rounded ${
                index === buttonIndex
                  ? "bg-success text-white fw-semibold"
                  : "bg-white text-dark border"
              }`}
              style={{ cursor: "pointer", transition: "all 0.3s" }}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>

      
        <div
          className="flex-grow-1"
          style={{
            marginLeft: "250px",
            padding: "0rem 2rem" 
          
          }}
        >
         {buttonIndex === 0 && <AllTasks />}

           {buttonIndex === 1 && <AddTask />}

       
        </div>
       
      </div>
     
    </>
  );
}

export default UserServiceCard;
