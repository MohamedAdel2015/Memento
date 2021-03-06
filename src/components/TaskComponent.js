import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, UIManager, Platform, Image, ToastAndroid } from 'react-native';
import { Card, CardSection, Confirm } from './common';
import PushNotification from 'react-native-push-notification';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import moment from 'moment';
import RealmController from '../Database/Realm';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function getDateFormat(date) {
    if (date) {
        return moment(date).calendar(null, {
            sameDay: '[Today] DD/MM/YYYY [at] h:mm a',
            nextDay: '[Tomorrow] DD/MM/YYYY [at] h:mm a',
            nextWeek: '[Next] dddd DD/MM/YYYY [at] h:mm a',
            lastDay: '[Yesterday] DD/MM/YYYY [at] h:mm a',
            lastWeek: '[Last] dddd DD/MM/YYYY [at] h:mm a',
            sameElse: 'dddd DD/MM/YYYY [at] h:mm a'
        });
    }
    else {
        return "No Reminder Date";
    }
}

class TaskComponent extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            showModal: false
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.renderDescription = this.renderDescription.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
        this.stopNotification = this.stopNotification.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }

    componentWillUpdate() {
        if(!this.state.showModal) {
            LayoutAnimation.spring();
        }
    }

    renderDescription() {
        if (this.state.expanded) {
            if(this.props.item.description.length > 0) {
                return (
                    <CardSection>
                        <Text style={styles.descriptionStyle}>{this.props.item.description}</Text>
                    </CardSection>
                );
            }
            else {
                return (
                    <CardSection>
                        <Text style={styles.descriptionStyle}>No Description</Text>
                    </CardSection>
                );
            }
        }
    }

    renderTitle(font, dateFont) {
        if(this.props.item.notifyMe) {
            if(this.props.item.repeatInterval === 'None') {
                return(
                    <Text style={{ ...styles.titleStyle, color: font }}>
                        {this.props.item.title} <IonIcons name='md-notifications' style={{ fontSize: 20, color: font }}/>
                    </Text>
                );
            }
            else {
                return(
                    <Text style={{ ...styles.titleStyle, color: font }}>
                        {this.props.item.title} <IonIcons name='md-notifications' style={{ fontSize: 20, color: font }}/> <FontIcons name='repeat' style={{ fontSize: 18, color: font }}/>
                    </Text>
                );
            }
        }
        else {
            return(
                <Text style={{ ...styles.titleStyle, color: font }}>
                    {this.props.item.title}
                </Text>
            );
        }
    }

    toggleDescription() {
        this.setState({ expanded: !this.state.expanded });
    }

    onAccept() {
        PushNotification.cancelLocalNotifications({ id: this.props.item.key + '' });
        RealmController.deleteTask(this.props.item);
        this.props.onTaskDelete();
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    stopNotification() {
        let item = this.props.item;
        RealmController.updateTask({
            key: item.key,
            title: item.title,
            description: item.description,
            taskDate: item.taskDate,
            repeatInterval: 'None',
            notifyMe: false
        });
        PushNotification.cancelLocalNotifications({ id: this.props.item.key + '' });
        this.forceUpdate();
    }

    render() {
        let color = '#FFF';
        let font = '#000';
        let dateFont = '#ADADAC';
        let more_menu = require('../images/more_menu.png');
        let thumbnail_image = require('../images/green-alarm.png');
        if (this.state.expanded) {
            color = '#00b3ff';
            font = '#FFF';
            dateFont = '#ECECEB';
            more_menu = require('../images/more_menu_white.png');
        }
        if (!this.props.item.taskDate) {
            if (this.state.expanded) {
                thumbnail_image = require('../images/no_time_white.png');
            }
            else {
                thumbnail_image = require('../images/no_time_black.png');
            }
        }
        else if (moment().diff(this.props.item.taskDate) > 0) {
            dateFont = 'red';
            thumbnail_image = require('../images/red-alarm.png');
        }
        else {
            dateFont = 'green';
        }
        return(
            <TouchableOpacity onPress={this.toggleDescription}>
                <Card>
                    <CardSection style={{ backgroundColor: color }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Image source={thumbnail_image} style={{ height:32, width: 32 }}/>
                            </View>
                            <View>
                                {this.renderTitle(font, dateFont)}
                                <Text style={{ ...styles.timeStyle, color: dateFont }}>{getDateFormat(this.props.item.taskDate)}</Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', right: 10, top: 8 }}>
                            <Menu>
                                <MenuTrigger>
                                    <Image style={{ height: 25, width: 25 }} source={more_menu} />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => this.props.onTaskEdit(this.props.item) } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5 }}>
                                                <FontIcons name='edit' style={{ fontSize: 15 }} /> Edit
                                            </Text>
                                        </View>
                                    </MenuOption>

                                    {this.props.item.notifyMe ? (<MenuOption onSelect={ () => this.stopNotification() } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5 }}>
                                                <IonIcons name='md-notifications-off' style={{ fontSize: 15 }} /> Stop Notifications
                                            </Text>
                                        </View>
                                    </MenuOption> ) : null }

                                    <MenuOption onSelect={() => this.setState({ showModal: true }) } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5, color: 'red' }}>
                                                <MatIcons name='delete-forever' style={{ fontSize: 15 }} /> Delete
                                            </Text>
                                        </View>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </CardSection>
                    {this.renderDescription()}
                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        Are you sure want to delete this Task?
                    </Confirm>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 30,
        color: '#000'
    },
    timeStyle: {
        fontSize: 12,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#ADADAC'
    },
    descriptionStyle: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    }
};

export default TaskComponent;