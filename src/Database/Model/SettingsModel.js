export default SettingsModel = {
    name: 'Settings',
    primaryKey: 'key',
    properties: {
        key: {type: 'string', indexed: true},
        value: 'string'
    }
}