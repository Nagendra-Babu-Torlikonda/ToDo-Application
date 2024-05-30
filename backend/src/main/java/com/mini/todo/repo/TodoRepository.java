package com.mini.todo.repo;

import com.mini.todo.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;


public interface TodoRepository extends MongoRepository<Task, String> {
    public long deleteManyByStatus(boolean status);
    @Query("{'_id': ?0}")
    @Update("{'$set': {'status': ?1}}")
    public void updateStatusById(String id, boolean newStatus);
}
