package com.paulotech.tasks_fullstack.service.impl;

import com.paulotech.tasks_fullstack.domain.entities.TaskList;
import com.paulotech.tasks_fullstack.repository.TaskListRepository;
import com.paulotech.tasks_fullstack.service.TaskListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    @Override
    public List<TaskList> listTaskLists() {
        return taskListRepository.findAll();
    }
}
