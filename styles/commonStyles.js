// styles/commonStyles.js
import { StyleSheet } from 'react-native';

const colors = {
    primary: '#007bff',
    primaryFaded: '#89c4f4',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#ffffff'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.light
    },
    title: {
        fontSize: 24,
        color: colors.dark,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: colors.dark,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: colors.background
    },
    button: {
        backgroundColor: colors.primary,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: colors.background,
        fontSize: 18,
    },
    disabledButton: {
        backgroundColor: colors.primaryFaded,
    },
    errorText: {
        color: colors.danger,
        marginBottom: 10,
    },
    togglePassword: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 5,
    }
});
