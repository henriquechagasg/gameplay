import React from 'react'
import { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Guild, GuildProps } from '../../components/guild'
import { Load } from '../../components/load'
import { theme } from '../../global/styles/theme'
import { api } from '../../services/api'

import { styles } from './styles'

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {

    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true)

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds')
        setGuilds(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchGuilds()
    }, [])


    const Divider = () => <View style={{
        marginVertical: 10, 
        width: '75%', 
        height: 1, 
        backgroundColor: theme.colors.heading,
        opacity: 0.4,
        marginLeft: '25%'
    }}/>

     return (
        <View style={styles.container}> 
         {
            loading ? <Load /> :
                <FlatList 
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)}    
                        />
                    )}
                    ItemSeparatorComponent={Divider}
                    style={styles.guilds}
                    contentContainerStyle={{paddingBottom: 69, paddingTop: 84 }}
                    ListHeaderComponent={Divider}
                />
                
            }
        </View>
    )
}