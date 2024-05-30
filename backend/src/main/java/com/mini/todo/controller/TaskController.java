package com.mini.todo.controller;

import com.mini.todo.entity.Task;
import com.mini.todo.repo.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TaskController {

    @Autowired
    TodoRepository repo;

    @GetMapping("/all")
    public List<Task> getAll(){
        return repo.findAll();
    }

    @PostMapping("/addTask")
    public List<Task> addTask(@RequestBody Task t){
        Task t2 = repo.save(t);
        return repo.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable String id){
        repo.deleteById(id);
    }

    @DeleteMapping("/deleteAll/{status}")
    public void getByStatus(@PathVariable boolean status){
        repo.deleteManyByStatus(status);
    }

    @PutMapping("/updateStatus/{id}/{newStatus}")
    public List<Task> updateStatus(@PathVariable String id, @PathVariable boolean newStatus){
        repo.updateStatusById(id, newStatus);
        return repo.findAll();
    }
}
