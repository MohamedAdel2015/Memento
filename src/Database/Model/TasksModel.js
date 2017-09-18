export default TasksModel = {
    name: 'Tasks',
    primaryKey: 'key',
    properties: {
        key: {type: 'int', indexed: true},
        title: 'string',
        description: 'string',
        latestUpdateTimeStamp: 'date',
        taskDate: {type: 'date', optional: true},
        status: 'int'
    }
}