export default TasksModel = {
    name: 'Tasks',
    primaryKey: 'key',
    properties: {
        key: {type: 'int', indexed: true},
        title: 'string',
        description: 'string',
        latestUpdateTimeStamp: 'date',
        taskDate: 'date',
        status: 'int'
    }
}