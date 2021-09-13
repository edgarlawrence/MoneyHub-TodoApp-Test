import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import axios from 'axios'

 function AddNoteForm({ navigation }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [complete, setComplete] = useState(false)

    const addForm = () => {
        const data = {
            title: title,
            desc: desc,
            complete: complete
        }
        axios.post('http://192.168.1.2:3000/todoNotes', data)
        .then(res => {
            console.log('res', res.data)
            setTitle('')
            setDesc('')
            setComplete(false)
        })
        console.log(data) 
        ///navigation.popToTop()
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
                onPress={addForm}
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

export default AddNoteForm