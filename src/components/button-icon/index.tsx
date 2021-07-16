import React from "react";
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native'

import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'

type Props = TouchableOpacityProps & {
    title: string,
    noIcon?: boolean
}

export function ButtonIcon({title, noIcon, ...rest}: Props) {

    return (
        <TouchableOpacity 
        style={styles.container}
        {...rest}
        >   
        {
            !noIcon &&
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} />
            </View>
        }


            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}