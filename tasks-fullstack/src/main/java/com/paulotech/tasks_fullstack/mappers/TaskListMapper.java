package com.paulotech.tasks_fullstack.mappers;

import com.paulotech.tasks_fullstack.domain.dto.TaskListDto;
import com.paulotech.tasks_fullstack.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);
    TaskListDto toDto(TaskList taskList);
}
