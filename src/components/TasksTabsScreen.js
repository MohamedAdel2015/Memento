import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid, Platform, UIManager, LayoutAnimation } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import TaskItem from './TaskComponent';
import RealmController from '../Database/Realm';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    }

    componentDidMount() {
        let currentTasks = RealmController.findAllPresentTasks().reverse();
        this.setState({ currentTasks: currentTasks });
    }

    static navigationOptions = {
        title: 'Current',
    };

    onTaskDelete() {
        let currentTasks = RealmController.findAllPresentTasks().reverse();
        console.log("Tasks ", currentTasks);
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
                <FlatList
                    data={this.state.currentTasks}
                    renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                />

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

    componentDidMount() {
        let pastTasks = RealmController.findAllPastTasks();
        this.setState({ pastTasks: pastTasks });
    }

    static navigationOptions = {
        title: 'Past',
    };

    onTaskEdit(item) {
        this.props.screenProps.navigation.navigate('TaskForm', { item: item });
    }

    onTaskDelete() {
        let pastTasks = RealmController.findAllPastTasks();
        console.log("Past Tasks ", pastTasks);
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
                <FlatList
                    data={this.state.pastTasks}
                    renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                />

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

    componentDidMount() {
        let noDateTasks = RealmController.findNoDateTasks().reverse();
        this.setState({ noDateTasks: noDateTasks });
    }

    static navigationOptions = {
        title: 'No Date',
    };

    onTaskEdit(item) {
        this.props.screenProps.navigation.navigate('TaskForm', { item: item });
    }

    onTaskDelete() {
        let noDateTasks = RealmController.findNoDateTasks().reverse();
        console.log("No Date Tasks ", noDateTasks);
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
                <FlatList
                    data={this.state.noDateTasks}
                    renderItem={({item}) => <TaskItem item={item} onTaskEdit={this.onTaskEdit} onTaskDelete={this.onTaskDelete}/> }
                />

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

export default class TabsScreen extends Component {

    render() {
        return(
            <View style={{ flex: 1 }}>
                <TasksTabsScreen screenProps={{ activeTab: this.props.navigation.state.params.activeTab, navigation: this.props.navigation }} />
            </View>
        );
    }
};