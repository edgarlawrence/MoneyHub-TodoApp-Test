import React, {useState, useCallback} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

export default function DetailsNote({ navigation, item, route }) {

    const updateForm = () => {
        const getData = route.params.name.id
        axios.put(`http://192.168.1.2:3000/todoNotes/${getData}`, {
            complete: !false,
            title: route.params.name.title,
            desc: route.params.name.desc
        })
        .then(res => {
            console.log(res, 'res')
        })
        console.log(updateForm)
        navigation.push('Home')
    }

    return (
        <View>
            <View style={styles.titleView}>
                <Text style={styles.titleStyle}> Your To Do List </Text>
            </View>
            <View style={styles.descStyle}>
                <Text style={styles.descText}> {route.params.name.desc} </Text>
            </View>
            <TouchableOpacity
                style={styles.completeBtn}
                onPress={updateForm}
            >
                <Text style={styles.completeText}> Complete </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    titleView: {
        alignItems: 'center',
        marginVertical: 50
    },
    titleStyle: {
        fontSize: 50,
    },
    descStyle: {
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingBottom: 100*3,
        marginLeft: 10*2,
        marginRight: 10*2
    },
    descText: {
        fontSize: 35
    },
    completeBtn: {
        alignItems: 'center',
        backgroundColor: '#0275d8',
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20
    },
    completeText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    }
})
