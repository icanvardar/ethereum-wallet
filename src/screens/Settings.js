import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthenticationProvider, {
    AuthenticationContext,
  } from "../context/AuthenticationProvider";

export default Settings = () => {
    const { logout } = useContext(AuthenticationContext);

    return (
        <View style={styles.container}>
            <Text>Hello!</Text>
            <Button title="logout" onPress={() => logout()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue"
    }
});