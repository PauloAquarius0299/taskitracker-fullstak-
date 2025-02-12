package com.paulotech.tasks_fullstack.controller;

import com.paulotech.tasks_fullstack.domain.dto.TaskDto;
import com.paulotech.tasks_fullstack.mappers.TaskMapper;
import com.paulotech.tasks_fullstack.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists/{task_list_id}/tasks")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TasksController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @GetMapping
    public List<TaskDto> listsTasks(@PathVariable("task_list_id")UUID taskListId){
        return taskService.listTasks(taskListId).stream().map(taskMapper::toDto).toList();
    }
}
