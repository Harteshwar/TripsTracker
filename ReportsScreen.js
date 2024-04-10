import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reports</Text>
            {/* Add options to generate different types of reports */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ReportsScreen;