package com.paulotech.tasks_fullstack.service.impl;

import com.paulotech.tasks_fullstack.domain.entities.Task;
import com.paulotech.tasks_fullstack.repository.TaskRepository;
import com.paulotech.tasks_fullstack.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }
}
