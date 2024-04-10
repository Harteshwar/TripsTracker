import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const DashboardScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar.Image
                    size={80}
                    source={require('./assets/avatar.png')}
                    style={styles.avatar}
                />
                <View style={styles.headerContent}>
                    <Title style={styles.headerTitle}>Welcome, John!</Title>
                    <Paragraph style={styles.headerSubtitle}>Ready for your next trip?</Paragraph>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <Card.Cover source={require('./assets/new-trip.jpg')} />
                    <Card.Content>
                        <Title>Start a New Trip</Title>
                        <Paragraph>Create a new trip and start tracking your journey.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('NewTrip')}
                            style={styles.cardButton}
                        >
                            New Trip
                        </Button>
                    </Card.Actions>
                </Card>

                <Card style={styles.card}>
                    <Card.Cover source={require('./assets/trip-list.jpg')} />
                    <Card.Content>
                        <Title>View All Trips</Title>
                        <Paragraph>Access your trip history and view details of each trip.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('TripList')}
                            style={styles.cardButton}
                        >
                            Trip List
                        </Button>
                    </Card.Actions>
                </Card>

                <Card style={styles.card}>
                    <Card.Cover source={require('./assets/reports.jpg')} />
                    <Card.Content>
                        <Title>Generate Reports</Title>
                        <Paragraph>Create reports based on your trip data for analysis and record-keeping.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('Reports')}
                            style={styles.cardButton}
                        >
                            Reports
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2196F3',
    },
    avatar: {
        marginRight: 20,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
    },
    content: {
        padding: 20,
    },
    card: {
        marginBottom: 20,
    },
    cardButton: {
        marginLeft: 'auto',
    },
});

export default DashboardScreen;