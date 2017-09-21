import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, UIManager, Platform, Image, ToastAndroid } from 'react-native';
import { Card, CardSection, Confirm } from './common';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import RealmController from '../Database/Realm';
import FontIcons from 'react-native-vector-icons/FontAwesome';
import MatIcons from 'react-native-vector-icons/MaterialIcons';

class ReminderComponent extends Component {

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
    }

    componentWillUpdate() {
        if(!this.state.showModal) {
            LayoutAnimation.spring();
        }
    }

    renderDescription() {
        if (this.state.expanded) {
            return(
                <CardSection>
                    <Text style={styles.descriptionStyle}>{this.props.item.value}</Text>
                </CardSection>
            );
        }
    }

    toggleDescription() {
        this.setState({ expanded: !this.state.expanded });
    }

    onAccept() {
        RealmController.deleteReminder(this.props.item);
        this.props.onReminderDelete();
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        let color = '#FFF';
        let font = '#000';
        let more_menu = require('../images/more_menu.png');
        if (this.state.expanded) {
            color = '#00b3ff';
            font = '#FFF';
            more_menu = require('../images/more_menu_white.png');
        }
        return(
            <TouchableOpacity onPress={this.toggleDescription}>
                <Card>
                    <CardSection style={{ backgroundColor: color }}>
                        <Text style={{ ...styles.titleStyle, color: font }}>{this.props.item.name}</Text>
                        <View style={{ position: 'absolute', right: 10, top: 5 }}>
                            <Menu>
                                <MenuTrigger>
                                    <Image style={{ height: 25, width: 25 }} source={more_menu} />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => this.props.onReminderEdit(this.props.item) } >
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5 }}>
                                                <FontIcons name='edit' /> Edit
                                            </Text>
                                        </View>
                                    </MenuOption>
                                    <MenuOption onSelect={() => this.setState({ showModal: true }) }>
                                        <View style={{ flex: 1, justifyContent: 'center', height: 30 }}>
                                            <Text style={{ fontSize: 15, marginLeft: 5, color: 'red' }}>
                                                <MatIcons name='delete-forever' /> Delete
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
                        Are you sure want to remove this Forgettable Thing?
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
        color: '#000'
    },
    descriptionStyle: {
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    }
};

export default ReminderComponent;