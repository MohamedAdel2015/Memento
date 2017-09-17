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
        width: Dimensions.get('window').width - 10,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 2,
        marginTop: 2
    }
};

export { Card };