import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, UIManager, Platform, Image, ToastAndroid } from 'react-native';
import { Card, CardSection } from './common';
import PushNotification from 'react-native-push-notification';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import moment from 'moment';

function getDateFormat(date) {
    return moment(date).calendar(null, {
        sameDay: '[Today] DD/MM/YYYY [at] h:mm a',
        nextDay: '[Tomorrow] DD/MM/YYYY [at] h:mm a',
        nextWeek: '[Next] dddd DD/MM/YYYY [at] h:mm a',
        lastDay: '[Yesterday] DD/MM/YYYY [at] h:mm a',
        lastWeek: '[Last] dddd DD/MM/YYYY [at] h:mm a',
        sameElse: 'dddd DD/MM/YYYY [at] h:mm a'
    });
}

class TaskComponent extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.renderDescription = this.renderDescription.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        if (this.state.expanded) {
            return(
                <CardSection>
                    <Text style={styles.descriptionStyle}>{this.props.item.description}</Text>
                </CardSection>
            );
        }
    }

    toggleDescription() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let color = '#FFF';
        let font = '#000';
        let dateFont = '#ADADAC';
        let more_menu = require('../images/more_menu.png');
        if (this.state.expanded) {
            color = '#00b3ff';
            font = '#FFF';
            dateFont = '#ECECEB';
            more_menu = require('../images/more_menu_white.png');
        }
        if (moment().diff(this.props.item.taskDate) > 0) {
            dateFont = 'red';
        }
        return(
            <TouchableOpacity onPress={this.toggleDescription}>
                <Card>
                    <CardSection style={{ backgroundColor: color }}>
                        <View>
                            <Text style={{ ...styles.titleStyle, color: font }}>{this.props.item.title}</Text>
                            <Text style={{ ...styles.timeStyle, color: dateFont }}>{getDateFormat(this.props.item.taskDate)}</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 10, top: 8 }}>
                            <Menu>
                                <MenuTrigger>
                                    <Image style={{ height: 25, width: 25 }} source={more_menu} />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => {} } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5 }}>Edit</Text>
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => PushNotification.cancelLocalNotifications({ id: this.props.item.key + '' })} >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5 }}>Stop Notifications</Text>
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => {} } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5, color: 'red' }}>Delete</Text>
                                        </View>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </CardSection>
                    {this.renderDescription()}
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 20,
        paddingLeft: 15,
        color: '#000'
    },
    timeStyle: {
        fontSize: 12,
        paddingLeft: 15,
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