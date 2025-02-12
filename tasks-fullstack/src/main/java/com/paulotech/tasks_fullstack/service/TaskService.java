package com.paulotech.tasks_fullstack.service;

import com.paulotech.tasks_fullstack.domain.entities.Task;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    List<Task> listTasks(UUID taskListId);
}
