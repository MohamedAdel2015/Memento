import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, CardSection } from './common';
import PushNotification from 'react-native-push-notification';

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
        PushNotification.cancelLocalNotifications({ id: this.props.item.key + '' });
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let color = '#FFF';
        let font = '#000';
        if (this.state.expanded) {
            color = '#00b3ff';
            font = '#FFF';
        }
        return(
            <TouchableOpacity onPress={this.toggleDescription}>
                <Card>
                    <CardSection style={{ backgroundColor: color }}>
                        <Text style={{ ...styles.titleStyle, color: font }}>{this.props.item.title}</Text>
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
    descriptionStyle: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    }
};

export default TaskComponent;