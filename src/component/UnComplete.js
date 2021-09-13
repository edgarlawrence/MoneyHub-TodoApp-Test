import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios';


 function UnComplete() {
    const [note, setNote] = useState([])
    const url = 'http://192.168.1.2:3000/todoNotes';

    const fetchData = async() => {
         const user = await axios.get(url)
         .then(res => {
             setNote(res.data)
         })
         .catch(err) (
             console.log(err => err)
         )
        console.log(user)
    } 

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.mainBase}>
           <Text style={styles.headerText}> Not Yet Done </Text>
            <View>
                {note.filter((item) => item.complete == false).map(item => {
                    return (
                        <Text key={item.id} style={styles.contentText}> {item.title} </Text>
                    )
                })}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainBase: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 35,
        paddingVertical: 25
    },
    contentText: {
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: '#FFC857',
        width: 350,
        textAlign: 'center',
        fontSize: 25,
        color: 'grey',
        borderRadius: 15
    }
})

export default UnComplete