import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import MainTabsScreen from './components/MainTabsScreen';
import RealmController from './Database/Realm';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TaskForm from './components/TaskForm';
import ReminderForm from './components/ReminderForm';
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
    }

    navigateToMainScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main' })
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
    Main: {
        screen: MainTabsScreen,
        navigationOptions: {
            headerTitle: <CustomHeader title='Memento'/>,
            headerStyle: {
                backgroundColor: '#007AFF'
            },
            headerRight: (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => ToastAndroid.show("Search", ToastAndroid.SHORT)}
                        style={{marginRight: 20}}
                    >
                        <Image source={require('./images/search.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => ToastAndroid.show("Menu", ToastAndroid.SHORT)}
                        style={{marginRight: 20}}
                    >
                        <Image source={require('./images/menu.png')}/>
                    </TouchableOpacity>
                </View>
            )
        }
    },
    TaskForm: {
        screen: TaskForm,
        navigationOptions: {
            headerTitle: 'Add Task',
            headerStyle: {
                backgroundColor: '#007AFF'
            },
            headerTintColor: '#FFF'
        }
    },
    ReminderForm: {
        screen: ReminderForm,
        navigationOptions: {
            headerTitle: 'Add Forgettable Thing',
            headerStyle: {
                backgroundColor: '#007AFF'
            },
            headerTintColor: '#FFF'
        }
    }
});

export default App;