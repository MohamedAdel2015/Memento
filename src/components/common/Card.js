import React from 'react';
import { View, Dimensions } from 'react-native';

const Card = (props) => {
    const { containerStyle } = styles;
    return(
        <View style={[containerStyle, props.style]}>{props.children}</View>
    );
};

const styles = {
    containerStyle: {
        width: Dimensions.get('window').width - 14,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2,
        marginLeft: 7,
        marginRight: 7,
        marginBottom: 2,
        marginTop: 2
    }
};

export { Card };