import Realm from 'realm';
import TasksModel from './Model/TasksModel';
import RemindersModel from './Model/RemindersModel';
import SettingsModel from './Model/SettingsModel';

let repository = new Realm({
    schema: [
        TasksModel,
        RemindersModel,
        SettingsModel
    ]
});

class RealmController {
    static tasksSurrogateKey = 0;
    static remindersSurrogateKey = 0;

    static findAllTasks() {
        return repository.objects('Tasks').slice();
    }

    static findAllTasksOrdered() {
        const sortBy =  [['taskDate', true]];
        return repository.objects('Tasks').sorted(sortBy).slice();
    }

    static findAllPresentTasks() {
        const sortBy =  [['taskDate', true]];
        return repository.objects('Tasks').filtered('taskDate > $0', new Date()).sorted(sortBy).slice();
    }

    static findAllPastTasks() {
        const sortBy =  [['taskDate', true]];
        return repository.objects('Tasks').filtered('taskDate <= $0', new Date()).sorted(sortBy).slice();
    }

    static findNoDateTasks() {
        return repository.objects('Tasks').filtered('taskDate = $0', null).slice();
    }

    static findAllReminders() {
        return repository.objects('Reminders').slice();
    }

    static updateSurrogateKeys() {
        /*let tasks = RealmController.findAllTasks();
        let reminders = RealmController.findAllReminders();
        console.log("All Tasks ", tasks);
        console.log("All Reminders ", reminders);
        if(tasks.length !== 0)
            RealmController.tasksSurrogateKey = tasks[tasks.length - 1].key;
        if(reminders.length !== 0)
            RealmController.remindersSurrogateKey = reminders[reminders.length - 1].key;
        console.log("Current # of Tasks ", RealmController.tasksSurrogateKey);
        console.log("Current # of Reminders", RealmController.remindersSurrogateKey);*/
        let taskSurrogateResponse = RealmController.findSetting('tasksSurrogateKey');
        if(taskSurrogateResponse.length > 0) {
            RealmController.tasksSurrogateKey = Number(taskSurrogateResponse[0].value);
        }
        let reminderSurrogateResponse = RealmController.findSetting('remindersSurrogateKey');
        if(reminderSurrogateResponse.length > 0) {
            RealmController.remindersSurrogateKey = Number(reminderSurrogateResponse[0].value);
        }
        console.log("Current # of Tasks ", RealmController.tasksSurrogateKey);
        console.log("Current # of Reminders", RealmController.remindersSurrogateKey);
    }

    static createTask(task) {
        let newTask;
        try{
            repository.write(() => {
                task.key = ++RealmController.tasksSurrogateKey;
                task.latestUpdateTimeStamp = new Date();
                task.status = 0;
                newTask = repository.create('Tasks', task);
            });
            RealmController.createSetting({ key: 'tasksSurrogateKey', value: RealmController.tasksSurrogateKey + '' });
            return newTask;
        }
        catch(e){
            console.log("error create task ", e);
            --RealmController.tasksSurrogateKey;
        }
    }

    static createReminder(reminder) {
        let newReminder;
        try{
            repository.write(() => {
                reminder.key = ++RealmController.remindersSurrogateKey;
                reminder.latestUpdateTimeStamp = new Date();
                newReminder = repository.create('Reminders', reminder);
            });
            RealmController.createSetting({ key: 'remindersSurrogateKey', value: RealmController.remindersSurrogateKey + '' });
            return newReminder;
        }
        catch(e){
            console.log("error create reminder ", e);
            --RealmController.remindersSurrogateKey;
        }
    }

    static createSetting(setting) {
        repository.write(() => {
            repository.create('Settings', setting, true);
        })
    }

    static findSetting(key) {
        return repository.objects('Settings').filtered(`key="${key}" `).slice();
    }

    static getNextTaskSurrogateKey() {
        return (RealmController.tasksSurrogateKey + 1);
    }

    static deleteTask(task) {
        repository.write(() => {
            repository.delete(task);
        })
    }

    static deleteReminder(reminder) {
        repository.write(() => {
            repository.delete(reminder);
        })
    }
}

export default RealmController;