import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid, Platform, UIManager, LayoutAnimation } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import TaskItem from './TaskComponent';
import { Spinner } from './common';
import RealmController from '../Database/Realm';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import PTRView from './common/PullToRefresh';

class CurrentTasks extends Component {

    constructor() {
        super();
        this.state = {
            currentTasks: []
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.onTaskDelete = this.onTaskDelete.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
        this.onNavigateToReminders = this.onNavigateToReminders.bind(this);
    }

    componentWillMount() {
        const { activeTab } = this.props.screenProps;
        if (activeTab && activeTab.length > 0) {
            this.props.navigation.navigate(activeTab);
        }
        this.setState({ currentTasks: this.props.screenProps.currentTasks });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentTasks: nextProps.screenProps.currentTasks });
    }

    static navigationOptions = {
        title: 'Current',
    };

    onTaskDelete() {
        let currentTasks = RealmController.findAllPresentTasks().reverse();
        this.setState({ currentTasks: currentTasks });
    }

    onTaskEdit(item) {
        this.props.screenProps.navigation.navigate('TaskForm', { item: item });
    }

    onNavigateToReminders() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Reminders', params: {activeTab: 'CurrentTasks'} })
            ]
        });
        this.props.screenProps.navigation.dispatch(resetAction);
    }

    render() {
        return(
            <View style={styles.tabViewStyle}>
                <PTRView onRefresh={this.props.screenProps.refreshView} colors={['#007aff']} >
                    <FlatList
                        data={this.state.currentTasks}
                        renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                    />
                </PTRView>

                <ActionButton buttonColor="#007AFF" icon={<Icon name="md-add" style={styles.actionButtonIcon}/>} spacing={8} offsetX={30} offsetY={20} useNativeFeedback={false}>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                       onPress={() => this.props.screenProps.navigation.navigate('TaskForm')}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Forgettable Things"
                                       onPress={() => this.onNavigateToReminders()}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-list" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#e74c3c' title="Logout" onPress={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' })
                            ]
                        });
                        this.props.screenProps.navigation.dispatch(resetAction);
                    }}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <ComIcon name="logout" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

class PastTasks extends Component {

    constructor() {
        super();
        this.state = {
            pastTasks: []
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.onTaskDelete = this.onTaskDelete.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
        this.onNavigateToReminders = this.onNavigateToReminders.bind(this);
    }

    componentWillMount() {
        this.setState({ pastTasks: this.props.screenProps.pastTasks });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pastTasks: nextProps.screenProps.pastTasks });
    }

    static navigationOptions = {
        title: 'Past',
    };

    onTaskEdit(item) {
        this.props.screenProps.navigation.navigate('TaskForm', { item: item });
    }

    onTaskDelete() {
        let pastTasks = RealmController.findAllPastTasks().reverse();
        this.setState({ pastTasks: pastTasks });
    }

    onNavigateToReminders() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Reminders', params: {activeTab: 'PastTasks'} })
            ]
        });
        this.props.screenProps.navigation.dispatch(resetAction);
    }

    render() {
        return(
            <View style={styles.tabViewStyle}>
                <PTRView onRefresh={this.props.screenProps.refreshView} colors={['#007aff']} >
                    <FlatList
                        data={this.state.pastTasks}
                        renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                    />
                </PTRView>

                <ActionButton buttonColor="#007AFF" icon={<Icon name="md-add" style={styles.actionButtonIcon}/>} spacing={8} offsetX={30} offsetY={20} useNativeFeedback={false}>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                       onPress={() => this.props.screenProps.navigation.navigate('TaskForm')}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Forgettable Things"
                                       onPress={() => this.onNavigateToReminders()}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-list" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#e74c3c' title="Logout" onPress={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' })
                            ]
                        });
                        this.props.screenProps.navigation.dispatch(resetAction);
                    }}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <ComIcon name="logout" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

class NoDateTasks extends Component {

    constructor() {
        super();
        this.state = {
            noDateTasks: []
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.onTaskDelete = this.onTaskDelete.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
        this.onNavigateToReminders = this.onNavigateToReminders.bind(this);
    }

    componentWillMount() {
        this.setState({ noDateTasks: this.props.screenProps.noDateTasks });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ noDateTasks: nextProps.screenProps.noDateTasks });
    }

    static navigationOptions = {
        title: 'No Date',
    };

    onTaskEdit(item) {
        this.props.screenProps.navigation.navigate('TaskForm', { item: item });
    }

    onTaskDelete() {
        let noDateTasks = RealmController.findNoDateTasks().reverse();
        this.setState({ noDateTasks: noDateTasks });
    }

    onNavigateToReminders() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Reminders', params: {activeTab: 'NoDateTasks'} })
            ]
        });
        this.props.screenProps.navigation.dispatch(resetAction);
    }

    render() {
        return(
            <View style={styles.tabViewStyle}>
                <PTRView onRefresh={this.props.screenProps.refreshView} colors={['#007aff']} >
                    <FlatList
                        data={this.state.noDateTasks}
                        renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                    />
                </PTRView>

                <ActionButton buttonColor="#007AFF" icon={<Icon name="md-add" style={styles.actionButtonIcon}/>} spacing={8} offsetX={30} offsetY={20} useNativeFeedback={false}>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                       onPress={() => this.props.screenProps.navigation.navigate('TaskForm')}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Forgettable Things"
                                       onPress={() => this.onNavigateToReminders()}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-list" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#e74c3c' title="Logout"
                                       onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Login' })
                                    ]
                                });
                                this.props.screenProps.navigation.dispatch(resetAction);
                               }}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <ComIcon name="logout" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const styles = {
    tabViewStyle: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    actionButtonIcon: {
        fontSize: 28,
        color: 'white',
    }
};

const TasksTabsScreen = TabNavigator(
    {
        CurrentTasks: {screen: CurrentTasks},
        NoDateTasks: {screen: NoDateTasks},
        PastTasks: {screen: PastTasks}
    },
    {
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#D0D0D0',
            style: {
                backgroundColor: '#007AFF',
            },
            indicatorStyle: {
                backgroundColor: '#D0D0D0',
                height: 3
            }
        }
    }
);

function updateDatabase() {
    return new Promise((resolve, reject) => {
        const pastTasks = RealmController.findAllPastTasks();
        for(let i = 0; i < pastTasks.length; i++) {
            if(pastTasks[i].notifyMe) {
                if(pastTasks[i].repeatInterval !== 'None') {
                    let newDate = updateTaskDate(pastTasks[i]);
                    RealmController.updateTask({
                        key: pastTasks[i].key,
                        title: pastTasks[i].title,
                        description: pastTasks[i].description,
                        taskDate: newDate,
                        repeatInterval: pastTasks[i].repeatInterval,
                        notifyMe: pastTasks[i].notifyMe
                    });
                }
                else {
                    RealmController.updateTask({
                        key: pastTasks[i].key,
                        title: pastTasks[i].title,
                        description: pastTasks[i].description,
                        taskDate: pastTasks[i].taskDate,
                        repeatInterval: 'None',
                        notifyMe: false
                    });
                }
            }
        }
        resolve();
    });
}

function updateTaskDate(task) {
    let newDate = task.taskDate;
    const diff = moment().diff(newDate);
    if(task.repeatInterval === 'Every Week') {
        while(newDate < new Date()) {
            newDate = moment(newDate).add(1, 'w').toDate();
        }
    }
    else if(task.repeatInterval === 'Every Day') {
        while(newDate < new Date()) {
            newDate = moment(newDate).add(1, 'd').toDate();
        }
    }
    else if(task.repeatInterval === 'Every Hour') {
        while(newDate < new Date()) {
            newDate = moment(newDate).add(1, 'h').toDate();
        }
    }
    else if(task.repeatInterval === 'Every Minute') {
        while(newDate < new Date()) {
            newDate = moment(newDate).add(1, 'm').toDate();
        }
    }
    return newDate;
}

export default class TabsScreen extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            currentTasks: [],
            pastTasks: [],
            noDateTasks: []
        };
        this.renderContent = this.renderContent.bind(this);
        this.refreshView = this.refreshView.bind(this);
    }

    refreshView() {
        return new Promise((resolve) => {
            setTimeout(() => {
                updateDatabase().then(() => {
                    let currentTasks = RealmController.findAllPresentTasks().reverse();
                    let pastTasks = RealmController.findAllPastTasks().reverse();
                    let noDateTasks = RealmController.findNoDateTasks().reverse();
                    this.setState({ currentTasks, pastTasks, noDateTasks });
                    resolve();
                })
            }, 1000);
        });
    }

    componentWillMount() {
       updateDatabase().then(() => {
           let currentTasks = RealmController.findAllPresentTasks().reverse();
           let pastTasks = RealmController.findAllPastTasks().reverse();
           let noDateTasks = RealmController.findNoDateTasks().reverse();
           this.setState({ loading: false, currentTasks, pastTasks, noDateTasks });
        });
    }

    renderContent() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner/>
                </View>
            );
        }
        return(
            <View style={{ flex: 1 }}>
                <TasksTabsScreen screenProps={{
                    activeTab: this.props.navigation.state.params.activeTab,
                    navigation: this.props.navigation,
                    refreshView: this.refreshView,
                    currentTasks: this.state.currentTasks,
                    pastTasks: this.state.pastTasks,
                    noDateTasks: this.state.noDateTasks
                }} />
            </View>
        );
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                {this.renderContent()}
            </View>
        );
    }
};