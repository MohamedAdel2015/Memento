import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import TasksTabsScreen from './components/TasksTabsScreen';
import RealmController from './Database/Realm';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TaskForm from './components/TaskForm';
import ReminderForm from './components/ReminderForm';
import RemindersList from './components/RemindersList';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import ComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';

class Home extends Component {

    constructor() {
        super();
        this.navigateToMainScreen = this.navigateToMainScreen.bind(this);
        this.renderWelcomeScreen = this.renderWelcomeScreen.bind(this);
    }

    static navigationOptions = {
        title: 'Home',
        header: null
    };

    componentWillMount() {
        RealmController.updateSurrogateKeys();
        //PushNotification.cancelAllLocalNotifications();
    }

    navigateToMainScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main', params: {activeTab: 'CurrentTasks'} })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    renderWelcomeScreen() {
        const user = RealmController.findSetting("user");
        const password = RealmController.findSetting("password");
        if (user.length !== 0 && password.length !== 0) {
            return(
                <LoginForm onLoginSuccess={this.navigateToMainScreen}/>
            );
        }
        else {
            return(
                <SignUpForm onLoginSuccess={this.navigateToMainScreen}/>
            );
        }
    }

    render() {
        return(
            <SplashScreen
                img={require('./images/background.png')}
                logo={require('./images/todo.png')}
                title={'Memento'}>
                {this.renderWelcomeScreen()}
            </SplashScreen>
        );
    }
}

class Login extends Component {

    constructor() {
        super();
        this.navigateToMainScreen = this.navigateToMainScreen.bind(this);
    }

    static navigationOptions = {
        title: 'Login',
        header: null
    };

    navigateToMainScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main', params: {activeTab: 'CurrentTasks'} })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return(
            <LoginForm onLoginSuccess={this.navigateToMainScreen}/>
        );
    }
}

class CustomHeader extends Component {

    render() {
        return(
            <View style={styles.headerStyle}>
                <Image source={require('./images/todo_white.png')} style={styles.logoStyle}/>
                <Text style={styles.headerTitleStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

class MainHeaderRight extends Component {

    render() {
        return(
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => ToastAndroid.show("Search", ToastAndroid.SHORT)}
                    style={{ marginRight: 10, marginTop: 2.5 }}
                >
                    <Image style={{ height: 25, width: 25 }} source={require('./images/search.png')}/>
                </TouchableOpacity>

                <View style={{ marginRight: 10 }}>
                    <Menu>
                        <MenuTrigger>
                            <Image style={{ height: 30, width: 30 }} source={require('./images/menu.png')}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Login' })
                                    ]
                                });
                                this.props.dispatch(resetAction);
                            }} >
                                <View style={{ flex: 1, justifyContent: 'center', height: 35 }}>
                                    <Text style={{ fontSize: 18, marginLeft: 5, color: '#000' }}>
                                        <ComIcon name="logout" style={{ fontSize: 18 }} /> Logout
                                    </Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoStyle: {
        margin: 10,
        width: 40,
        height: 40
    },
    headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
};


const App = StackNavigator({
    Home: { screen: Home },
    Login: { screen: Login },
    Main: {
        screen: TasksTabsScreen,
        navigationOptions: ({ navigation }) => {
            const { dispatch } = navigation;
            return {
                headerTitle: <CustomHeader title='Tasks'/>,
                headerStyle: {
                    backgroundColor: '#007AFF'
                },
                headerRight: ( <MainHeaderRight dispatch={dispatch} /> )
            }
        }
    },
    Reminders: {
        screen: RemindersList,
        navigationOptions: ({ navigation }) => {
            const { dispatch } = navigation;
            return {
                headerTitle: <CustomHeader title='Forgettable Things'/>,
                headerStyle: {
                    backgroundColor: '#007AFF'
                },
                headerTintColor: '#FFF',
                headerRight: ( <MainHeaderRight dispatch={dispatch} /> )
            }
        }
    },
    TaskForm: {
        screen: TaskForm,
        navigationOptions: ({ navigation }) => {
            const { dispatch } = navigation;
            return {
                headerTitle: 'Add Task',
                headerStyle: {
                    backgroundColor: '#007AFF'
                },
                headerTintColor: '#FFF',
                headerRight: (
                    <View style={{ marginRight: 10 }}>
                        <Menu>
                            <MenuTrigger>
                                <Image style={{ height: 30, width: 30 }} source={require('./images/menu.png')}/>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => {
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Login' })
                                        ]
                                    });
                                    dispatch(resetAction);
                                }} >
                                    <View style={{ flex: 1, justifyContent: 'center', height: 35 }}>
                                        <Text style={{ fontSize: 18, marginLeft: 5, color: '#000' }}>
                                            <ComIcon name="logout" style={{ fontSize: 18 }} /> Logout
                                        </Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                )
            }
        }
    },
    ReminderForm: {
        screen: ReminderForm,
        navigationOptions: ({ navigation }) => {
            const { dispatch } = navigation;
            return {
                headerTitle: 'Add Forgettable Thing',
                headerStyle: {
                    backgroundColor: '#007AFF'
                },
                headerTintColor: '#FFF',
                headerRight: (
                    <View style={{ marginRight: 10 }}>
                        <Menu>
                            <MenuTrigger>
                                <Image style={{ height: 30, width: 30 }} source={require('./images/menu.png')}/>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => {
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Login' })
                                        ]
                                    });
                                    dispatch(resetAction);
                                }} >
                                    <View style={{ flex: 1, justifyContent: 'center', height: 35 }}>
                                        <Text style={{ fontSize: 18, marginLeft: 5, color: '#000' }}>
                                            <ComIcon name="logout" style={{ fontSize: 18 }} /> Logout
                                        </Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                )
            }
        }
    }
});

export default App;