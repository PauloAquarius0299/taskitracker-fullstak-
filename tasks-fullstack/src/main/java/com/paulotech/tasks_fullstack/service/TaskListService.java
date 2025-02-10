package com.paulotech.tasks_fullstack.service;

import com.paulotech.tasks_fullstack.domain.entities.TaskList;

import java.util.List;

public interface TaskListService {
    List<TaskList> listTaskLists();
}
