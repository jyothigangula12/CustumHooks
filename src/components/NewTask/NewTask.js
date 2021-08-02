import { useEffect, useState} from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../hooks/use-http";
const NewTask = (props) => {
 
  const transformTask = (taskData,data) => {
    console.log(taskData,data)
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskData };

    props.onAddTask(createdTask);
  };
 
  const { error, isLoading, sendRequest } = useHttp(
    
  );
 
  const enterTaskHandler = async (taskText) => {
  
    sendRequest({
      url: "https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: {text:taskText},
      headers: {
        "Content-Type": "application/json",
      },
    },
    transformTask.bind(null,taskText))
   /*  dataFromHook = taskText.slice();
    console.log(dataFromHook); */
  };

  /*  setIsLoading(true);
    setError(null);
   
    try {
      const response = await fetch(
        'https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }; */

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
