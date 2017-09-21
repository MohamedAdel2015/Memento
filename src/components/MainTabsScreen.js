import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid } from 'react-native';
import { TabNavigator } from 'react-navigation';
import TaskItem from './TaskComponent';
import ReminderItem from './ReminderComponent';
import FloatingActionButton from './FloatingActionButton';
import RealmController from '../Database/Realm';
import ActionButton from 'react-native-action-button';

let reminders = [];

class TasksList extends Component {

    constructor() {
        super();
        let currentTasks = RealmController.findAllPresentTasks().reverse();
        let pastTasks = RealmController.findAllPastTasks();
        let noDateTasks = RealmController.findNoDateTasks();
        let tasks = currentTasks.concat(noDateTasks).concat(pastTasks);
        this.state = {
            tasks: tasks
        };
        this.onTaskDelete = this.onTaskDelete.bind(this);
    }

    static navigationOptions = {
        title: 'Tasks',
    };

    onTaskDelete() {
        let currentTasks = RealmController.findAllPresentTasks().reverse();
        let pastTasks = RealmController.findAllPastTasks();
        let noDateTasks = RealmController.findNoDateTasks();
        let tasks = currentTasks.concat(noDateTasks).concat(pastTasks);
        this.setState({ tasks: tasks });
    }

    render() {
        return (
            <View style={styles.tabViewStyle}>
                <FlatList
                    data={this.state.tasks}
                    renderItem={({item}) => <TaskItem item={item} onTaskDelete={this.onTaskDelete}/> }
                />
                <ActionButton
                    buttonColor='rgba(0, 122, 255, 1)'
                    onPress={() => this.props.navigation.navigate('TaskForm')}
                />
            </View>
        );
    }
}

class RemindersList extends Component {

    constructor() {
        super();
        let reminders = RealmController.findAllReminders().reverse();
        this.state = {
            reminders: reminders
        };
        this.onReminderDelete = this.onReminderDelete.bind(this);
    }

    onReminderDelete() {
        let reminders = RealmController.findAllReminders().reverse();
        this.setState({ reminders: reminders });
    }

    static navigationOptions = {
        title: 'Forgettable Things',
    };

    render() {
        return (
            <View style={styles.tabViewStyle}>
                <FlatList
                    data={this.state.reminders}
                    renderItem={({item}) => <ReminderItem item={item} onReminderDelete={this.onReminderDelete}/> }
                />
                <ActionButton
                    buttonColor='rgba(0, 122, 255, 1)'
                    onPress={() => this.props.navigation.navigate('ReminderForm')}
                />
            </View>
        );
    }
}

const styles = {
    tabViewStyle: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5
    }
};

const MainTabsScreen = TabNavigator({
        Tasks: { screen: TasksList },
        Reminders: { screen: RemindersList }
    },
    {
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#D0D0D0',
            style: {
                backgroundColor: '#007AFF',
            },
            indicatorStyle: {
                backgroundColor: '#D0D0D0'
            }
        }
    }
);

export default  MainTabsScreen;