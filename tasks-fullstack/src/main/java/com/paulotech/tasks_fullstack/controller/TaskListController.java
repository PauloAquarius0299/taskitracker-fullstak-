package com.paulotech.tasks_fullstack.controller;

import com.paulotech.tasks_fullstack.domain.dto.TaskListDto;
import com.paulotech.tasks_fullstack.mappers.TaskListMapper;
import com.paulotech.tasks_fullstack.service.TaskListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/task-lists")
@RequiredArgsConstructor
public class TaskListController {

    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    @GetMapping
    public List<TaskListDto> listTaskDto(){
        return taskListService.listTaskLists().stream()
                .map(taskListMapper::toDto)
                .toList();
    }

}
