import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { GuildIcon } from '../guild-icon'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

export type GuildProps = {
    id: string,
    name: string,
    icon: null | string,
    owner: boolean
}

type Props = TouchableOpacityProps & {
    data: GuildProps
}

export function Guild({data, ...rest}: Props) {
    return (
        <TouchableOpacity
        {...rest}
        style={styles.container}
        activeOpacity={0.7}
        >
            <GuildIcon guildId={data.id} iconId={data.icon} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>
                    <Text style={styles.type}>
                        {data.owner ? 'Administrador' : 'Convidado'}
                    </Text>
                </View>
            </View>

            <Feather 
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    )
}