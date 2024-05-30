import { DeleteRounded,  AssignmentTurnedInRounded, UndoRounded, DeleteSweepRounded } from '@mui/icons-material';
import {red} from '@mui/material/colors';
import { useState } from 'react';

const UsingReact = () =>
{
const [inputValue, setInputValue] = useState("")
  const [tasks, setTasks  ] = useState([ { id : 1, task : "task 1 to do"}, 
                    {id : 2 , task : "task 2 to do"}]);
  const [completedtasks, setCompletedtasks] = useState([]);
  console.log(completedtasks, completedtasks.length);
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));

  }
  const handleChange = (event) => setInputValue(event.target.value);

  const submit = (event) => {
    const t = {id : tasks.length + 1, task : inputValue}
    setTasks([...tasks, t])
    setInputValue("")
  };

  const taskDone = (id) => {
    tasks.forEach((t) => {
      if (t.id === id) {
        setCompletedtasks([...completedtasks,t])
      } 
    })
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
  }

  const taskUndo = (id) => {
    completedtasks.forEach((t) => {
      if (t.id === id) {
        setTasks([...tasks,t])
      } 
    })
    const updated = completedtasks.filter((t) => t.id !== id);
    setCompletedtasks(updated);
  }

  const deleteAll = (a) => {
    if(a === "todo")
      setTasks([]);
    else
      setCompletedtasks([]);
  }
  return (
    <div className="UsingReact">
      <h1 className='heroHead'>To-do List</h1>
      <div className='content'>
        <div className='inputBar'>
            <input type='text' name = 'task' value={inputValue} onChange={handleChange} className='taskinput' placeholder='What do you think to do' />
            <input type='submit' className='addButton' onClick={submit} value= "+Add" />
        </div>
        <div className='lists'>
          <div className='tasksList'>
            <div className='headingBar'>
              <p className='headingText'>Tasks To-Do</p>
              <DeleteSweepRounded sx={{ color: 'orange' }} onClick = {() => deleteAll("todo")} className='deleteAllbutton'/>
            </div>
            
              {tasks.map((t) => {
                return(
                <div className='task'>
                  <p className='taskText'>{t.task}</p>
                  <DeleteRounded sx={{ color: red[600] }} className='deleteButton' onClick = {() => deleteTask(t.id)}/>
                  <AssignmentTurnedInRounded className='taskDoneButton' onClick = {() => taskDone(t.id)}/>
                </div>);
              })}

          </div>
          <div className='completedTasksList'>
            <div className='headingBar'>
              <p className='headingText'>Recent Tasks</p>
              <DeleteSweepRounded sx={{ color: 'orange' }} onClick = {() => deleteAll("completed")} className='deleteAllbutton'/>
            </div>
              {completedtasks.length > 0 && completedtasks.map((t) => {
                return(
                <div className='task'>
                  <p className='taskText'>{t.task}</p>
                  <UndoRounded sx={{color : 'greenyellow'}} onClick = {() => taskUndo(t.id)} className='undoButton'/>
                </div>);
              })}
          </div>
        </div>
      </div>
    </div>
  );

}

export default UsingReact;