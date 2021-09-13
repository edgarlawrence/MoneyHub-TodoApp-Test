import React, {useState, useEffect, useCallback} from 'react'
import { ViewBase, Text, StyleSheet, View, Image, TextInput, FlatList, TouchableOpacity, Button, TouchableHighlight } from 'react-native'
import checkLogo from '../img/checked.png'
import listLogo from '../img/list-text.png'
import searchLogo from '../img/search.png'
import plusLogo from '../img/plus.png'
import deleteLogo from '../img/delete.png'
import editLogo from '../img/edit.png'
import axios from 'axios'
import { SwipeListView } from 'react-native-swipe-list-view';
import { NavigationContainer } from "@react-navigation/native";

import  AddNoteForm  from './AddNoteForm'

 function Mainhome({navigation}) {
        const [note, setNote] = useState([])
        const [filterData, setFilterData] = useState([])
        const [search, setSearch] = useState('')

        const url = 'http://192.168.1.2:3000/todoNotes';

        const searchFilter = (e) => {
            if(e) {
                const newData = note.filter((notes) => {
                    const notesData = notes.title ? notes.title.toUpperCase() : ''.toUpperCase()
                    const eData = e.toUpperCase()
                    return notesData.indexOf(eData) > -1
                })
                setFilterData(newData)
                setSearch(e)
                console.log(newData)
            } else {
                setFilterData(note)
                setSearch(e)
            }
        }

        const fetchData = async() => {
            const user = await axios.get(url)
            .then(res => {
                setNote(res.data)
                setFilterData(res.data)
            })
            console.log(user)
        } 

        useEffect(() => {
            fetchData()
        }, [])

        const closeRow = (rowMap, rowKey) => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
            }
        };

        const deleteData = (id) => {
            axios.delete(`${url}/${id}`)
            .then(res => {
                const del = note.filter(notee => id !== notee.id)
                setNote(del)
                setFilterData(del)
            }) 
            .catch(err => err)
        }
    
        const deleteRow = (rowMap, rowKey) => {
            closeRow(rowMap, rowKey);
            const newData = [...note];
            const prevIndex = note.findIndex(item => item.key === rowKey);
            newData.splice(prevIndex, 0);
            setNote(newData);
        };

        return (          
            <View>
                <View>
                    <Text style={styles.header}> Todo App </Text>
                </View>    
                <View>
                    <TextInput 
                        value={search}
                        onChangeText={(e) => searchFilter(e)}
                        placeholder="enter a text" 
                        style={styles.searchStyle} 
                    />
                </View>

                <View>
                     <SwipeListView
                         useFlatList={true}
                         keyExtractor={(key) => key.id.toString()}
                         data={filterData}
                         renderItem={(rowData, rowMap, item) => (
                             <View>
                             <TouchableOpacity onPress={() => navigation.navigate('Details', {name: rowData.item})}>
                                 <Text style={listStyle.flatStyle}> {rowData.item.title} </Text>
                             </TouchableOpacity>
                             </View>
                         )}
                         renderHiddenItem={ ( rowData, rowMap, item ) => (
                            <View style={styles.rowBack}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('Edit', {name: rowData.item})}
                            >
                                <Image source={editLogo} 
                                style={styles.editBox}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => deleteRow(rowData.item.id)}
                            onPressIn={() => deleteData(rowData.item.id)}
                            >
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                         )}
                         leftOpenValue={75}
                         rightOpenValue={-150}
                         onRowOpen={(rowKey, rowMap) => {
                             setTimeout(() => {
                                 rowMap[rowKey] && rowMap[rowKey].closeRow()
                             }, 2000)
                         }}
                     />
                </View>

                <View style={styles.buttonStyle}>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Add')}
                        style={logoStyle.btnText}
                    >
                        <Image 
                        source={plusLogo} 
                        style={logoStyle.logoSize}
                        />
                     </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        header: {
            fontSize: 35,
            textAlign: 'center',
            paddingVertical: 10
        },
        editBox: {
            height: 35,
            width: 35
        },
        buttonStyle: {
            position: 'absolute',
            alignItems: 'flex-end',
            flexDirection: 'column',
            top: 500,
            right: 10
        },
        searchStyle: {
            borderColor: 'black',
            borderWidth: 1,
            fontSize: 30,
            marginVertical: 10,
            paddingVertical: 10,
            borderRadius: 15,
            textAlign: 'center'
        },
        listStyles: {
            flexDirection: 'column'
        },
        delBtn: {
            position: 'absolute',
            left: 330,
            top: 7
        },
        backLeftBtn: {
            width: 10,
            alignItems: 'center',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 50,
            height: 50,
            backgroundColor: '#3DD6D0',
            marginRight: 70
        },
        backLeftBtnLeft: {
            backgroundColor: '#3DD6D0',
            right: 0
        },
        backRightBtn: {
            alignItems: 'center',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 150,
            height: 50,
            backgroundColor: 'red',
        },
        backRightBtnRight: {
            backgroundColor: 'red',
            right: 0
        },
        backTextWhite: {
            color: '#FFF',
        },
        rowBack: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,

        },
    })
    
    const logoStyle = StyleSheet.create({
        logoSize: {
            width: 50,
            height: 50
        },
        btnText: {
            width: 95,
            height: 95,
            borderRadius: 95/2,
            backgroundColor: '#CEA2AC',
            paddingLeft: 23,
            paddingTop: 23
        }
    })

    const listStyle = StyleSheet.create({
        flatStyle: {
            backgroundColor: '#fffaed',
            height: 50,
            width: 420,
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 10,
            fontSize: 25,
            paddingTop: 5,
            color: 'black',
            paddingLeft: 10
        }
    })


export default Mainhome