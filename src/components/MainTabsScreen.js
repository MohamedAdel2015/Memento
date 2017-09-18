import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid } from 'react-native';
import { TabNavigator } from 'react-navigation';
import TaskItem from './TaskComponent';
import ReminderItem from './ReminderComponent';
import FloatingActionButton from './FloatingActionButton';
import RealmController from '../Database/Realm';

let tasks = [];

let reminders = [];

class TasksList extends Component {

    static navigationOptions = {
        title: 'Tasks',
    };

    componentWillMount() {
        tasks = RealmController.findAllTasks().reverse();
    }

    render() {
        return (
            <View style={styles.tabViewStyle}>
                <FlatList
                    data={tasks}
                    renderItem={({item}) => <TaskItem item={item}/> }
                />
                <FloatingActionButton onPress={() => this.props.navigation.navigate('TaskForm')}/>
            </View>
        );
    }
}

class RemindersList extends Component {

    constructor() {
        super();
    }

    static navigationOptions = {
        title: 'Forgettable Things',
    };

    componentWillMount() {
        reminders = RealmController.findAllReminders().reverse();
    }

    render() {
        return (
            <View style={styles.tabViewStyle}>
                <FlatList
                    data={reminders}
                    renderItem={({item}) => <ReminderItem item={item}/> }
                />
                <FloatingActionButton onPress={() => this.props.navigation.navigate('ReminderForm')}/>
            </View>
        );
    }
}

const styles = {
    tabViewStyle: {
        flex: 1,
        backgroundColor: '#FFF'
    }
};

const MainTabsScreen = TabNavigator({
        Tasks: { screen: TasksList },
        Reminders: { screen: RemindersList }
    },
    {
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#B4B4B4',
            style: {
                backgroundColor: '#007AFF',
            },
            indicatorStyle: {
                backgroundColor: '#B4B4B4'
            }
        }
    }
);

export default  MainTabsScreen;