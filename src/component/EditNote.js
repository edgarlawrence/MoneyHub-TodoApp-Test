import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import axios from 'axios'

export default function EditNote({ navigation, item, route }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [complete, setComplete] = useState(false)

    const editForm = () => {
        const getData = route.params.name.id
        const data = {
             title, desc, complete
        }
        axios.put(`http://192.168.1.2:3000/todoNotes/${getData}`, data)
        .then(res => {
            console.log(res.data, 'res')
            setTitle('')
            setDesc('')
            setComplete(false)
        })
        console.log(data)
        navigation.push('Home')
    }

    return (
        <View>
            <View>
                <TextInput 
                   placeholder="Enter a title" 
                   style={textStyles.titleStyle}
                   value={title}
                   onChangeText={(value) => setTitle(value)}
                />
            </View>

            <View>
                <TextInput 
                   placeholder="Enter an Description"
                   style={textStyles.descStyle}
                   onChangeText={(value) => setDesc(value)}
                   value={desc}
                />
            </View>

            <View style={textStyles.btnBackground}>
                <TouchableOpacity
                onPress={editForm}
                >
                    <Text style={textStyles.btnStyles}> Save A Post </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const textStyles = StyleSheet.create({
    titleStyle: {
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 15,
        fontSize: 30,
        paddingLeft: 10,
        marginTop: 25
    },
    descStyle: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
        paddingVertical: 200,
        fontSize: 30,
        textAlign: 'center'
    },
    btnStyles: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    btnBackground: {
        backgroundColor: '#0275d8',
        paddingTop: 25,
        paddingBottom: 35
    }
})