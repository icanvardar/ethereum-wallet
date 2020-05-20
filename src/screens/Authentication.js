import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default Authorization = () => {
    return (
        <View style={styles.container}>
            <Text>AUTHORIZATION!</Text>
            <TouchableOpacity><Text>Authorize me!</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        backgroundColor: "tomato"
    }
});