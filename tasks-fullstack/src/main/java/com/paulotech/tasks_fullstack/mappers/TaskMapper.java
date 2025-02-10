package com.paulotech.tasks_fullstack.mappers;

import com.paulotech.tasks_fullstack.domain.dto.TaskDto;
import com.paulotech.tasks_fullstack.domain.entities.Task;

public interface TaskMapper {

     Task fromDto(TaskDto taskDto);
     TaskDto toDto(Task task);
}
