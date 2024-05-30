import React, { useEffect } from 'react';
import { DeleteRounded,  AssignmentTurnedInRounded, UndoRounded, DeleteSweepRounded } from '@mui/icons-material';
import {red} from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';

function UsingJava() {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks  ] = useState([]);
    const [completedtasks, setCompletedtasks] = useState([]);

    useEffect(() => {
      axios.get("/all")
        .then(response => {
          const t = response.data;
          const t1 = t.filter(a => !a.status);
          const t2 = t.filter(a => a.status);
          setTasks(t1);
          setCompletedtasks(t2);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
    }, [tasks, completedtasks]);
    const handleChange = (event) => setInputValue(event.target.value);

    const submit = (event) => {
        const t = {task : inputValue, status : false}
        axios.post("/addTask", t).then(response => {
            const t = response.data;
            t.forEach(element => {
                if(!element.status)
                  setTasks([...tasks, element])
            });
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
        setInputValue("")
    };

    const deleteAll = (status) => {
      axios.delete(`/deleteAll/${status}`)
        .then()
        .catch(error => {
        console.error("Error fetching data: ", error);
      });
    }

    const deleteTask = (id) => {
      axios.delete(`/delete/${id}`).then().catch(error => {
        console.error("Error fetching data: ", error);
      });
    }

    const updateTask = (id, status) => {
      axios.put(`/updateStatus/${id}/${status}`)
        .then()
        .catch(error => {
        console.error("Error fetching data: ", error);
      });
    }

  return (
    <div className="UsingJava">
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
              <DeleteSweepRounded sx={{ color: 'orange' }} onClick = {() => deleteAll(false)} className='deleteAllbutton'/>
            </div>
            
              {tasks.map((t) => {
                return(
                <div className='task'>
                  <p className='taskText'>{t.task}</p>
                  <DeleteRounded sx={{ color: red[600] }} onClick = {() => deleteTask(t.id)} className='deleteButton'/>
                  <AssignmentTurnedInRounded className='taskDoneButton' onClick = {() => updateTask(t.id, true)} />
                </div>);
              })}

          </div>
          <div className='completedTasksList'>
            <div className='headingBar'>
              <p className='headingText'>Recent Tasks</p>
              <DeleteSweepRounded sx={{ color: 'orange' }} onClick = {() => deleteAll(true)} className='deleteAllbutton'/>
            </div>
              {completedtasks.length > 0 && completedtasks.map((t) => {
                return(
                <div className='task'>
                  <p className='taskText'>{t.task}</p>
                  <UndoRounded sx={{color : 'greenyellow'}} onClick = {() => updateTask(t.id, false)} className='undoButton'/>
                </div>);
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsingJava