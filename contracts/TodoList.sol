// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string taskName;
        string description;
        bool completed;
    }

    mapping (uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string taskName,
        string description,
        bool completed
    );
    
    event TaskCompleted(
        uint id,
        bool completed
    );
    
    constructor() {
        createTask("This is a new task", "You can write the description here");
    }

    function createTask(string memory _name, string memory _description) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _name, _description, false);
        emit TaskCreated(taskCount, _name, _description, false);
    }

    function toggleCompleted(uint taskId) public {
        tasks[taskId].completed = !tasks[taskId].completed;
        emit TaskCompleted(taskId,tasks[taskId].completed);
    }

}