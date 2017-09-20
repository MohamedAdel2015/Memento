import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid, Platform, UIManager, LayoutAnimation } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import ReminderItem from './ReminderComponent';
import RealmController from '../Database/Realm';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import ComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class RemindersList extends Component {

    constructor() {
        super();
        let reminders = RealmController.findAllReminders();
        this.state = {
            reminders: reminders
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.onReminderDelete = this.onReminderDelete.bind(this);
        this.onNavigateToTasks = this.onNavigateToTasks.bind(this);
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onReminderDelete() {
        let reminders = RealmController.findAllReminders();
        console.log("Reminders ", reminders);
        this.setState({ reminders: reminders });
    }

    static navigationOptions = {
        title: 'Forgettable Things',
    };

    onNavigateToTasks() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main', params: {activeTab: this.props.navigation.state.params.activeTab} })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.tabViewStyle}>
                <FlatList
                    data={this.state.reminders}
                    renderItem={({item}) => <ReminderItem item={item} onReminderDelete={this.onReminderDelete}/> }
                />

                <ActionButton buttonColor="#007AFF" icon={<Icon name="md-add" style={styles.actionButtonIcon}/>} spacing={8} offsetX={30} offsetY={20} useNativeFeedback={false}>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Forgettable Thing"
                                       onPress={() => this.props.navigation.navigate('ReminderForm')}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Tasks"
                                       onPress={() => this.onNavigateToTasks()}
                                       useNativeFeedback={false}
                                       spaceBetween={10}>
                        <OctIcon name="checklist" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#e74c3c' title="Logout" onPress={() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' })
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
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

export default RemindersList;