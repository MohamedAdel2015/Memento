export default RemindersModel = {
    name: 'Reminders',
    primaryKey: 'key',
    properties: {
        key: {type: 'int', indexed: true},
        name: 'string',
        value: 'string',
        latestUpdateTimeStamp: 'date'
    }
}