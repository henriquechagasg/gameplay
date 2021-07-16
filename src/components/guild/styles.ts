import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles =  StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: theme.fonts.title700,
        color:theme.colors.heading,
        fontSize: 18,
        marginBottom: 11
    },
    type: {
        fontFamily: theme.fonts.title700,
        color:theme.colors.heading,
        fontSize: 13,
        marginBottom: 24
    }
})