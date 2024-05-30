package com.mini.todo.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
@Data
@Getter
@Setter
public class Task {
    @Id
    private String id;
    private String task;
    private boolean status;

}
