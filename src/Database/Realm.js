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

    static findAllReminders() {
        return repository.objects('Reminders').slice();
    }

    static updateSurrogateKeys() {
        let tasks = RealmController.findAllTasks();
        let reminders = RealmController.findAllReminders();
        if(tasks.length !== 0)
            RealmController.tasksSurrogateKey = tasks[tasks.length - 1].key;
        if(reminders.length !== 0)
            RealmController.remindersSurrogateKey = reminders[reminders.length - 1].key;
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
}

export default RealmController;