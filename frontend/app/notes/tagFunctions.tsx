import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable, ScrollView} from 'react-native';
import { getTagsByUser, deleteTag } from '@/services/notes.service';


import basic from '@/components/styles/basics';
import notesStyle from '@/components/styles/noteStyle';
import { addTag } from '@/services/notes.service';



export function InputNewTag({ setOpnNewTag, setTags, setValue}:{setOpnNewTag: Dispatch<SetStateAction<boolean>>; setTags: Dispatch<SetStateAction<{key: number, Tag: string}[]>>; setValue: Dispatch<SetStateAction<string>>}) {
    const [newTag, setNewTag] = useState('');
    const [text, setText] = useState('');

    const [slctdInTag, setSlctdInTag] = useState("none");
    function GetTags({ slctdInTag, setSlctdInTag }: {slctdInTag: string; setSlctdInTag: Dispatch<SetStateAction<string>>; setTags: Dispatch<SetStateAction<any[]>>}) {
        const [tempTags, setTempTags] = useState([]);
        useEffect(() => {
            if (slctdInTag!="none") {
                // console.log("slctdInTag:", slctdInTag);
                deleteTag(slctdInTag).then((res) => {
                    setSlctdInTag("none");
                    setOpnNewTag(false);
                }
                ).catch((error) => {
                    console.error("Error deleting tag:", error);
                });
            }
          const userID = 1; // Placeholder user ID, replace with actual authentication
          getTagsByUser(userID).then((res) => {
            setTempTags(res);
          }).catch((error) => {
            console.error("Error fetching tags:", error);
          });
        }, [slctdInTag]);
        return (
          <View>
            {tempTags.map((tag: { id: number; tag: string }, index: number) => (
              <View style={basic.button} key={index}>
                <Pressable onPress={() => {
                    const result = confirm('Are you sure you want to delete this tag? This will delete this tag from all of your notes and cannot be undone!', tag.tag);
                    if (result == true) {
                        handleChange(setSlctdInTag, tag.id);
                    } else {
                        setSlctdInTag("none");
                    }
                    }}>
                    <Text>{tag.tag}</Text>
                    </Pressable>
              </View>
            ))}
          </View>
        );
      }
    const handleSaveTag = async () => {
        try {

            const userID = 1; // Placeholder user ID, replace with actual authentication
            const response = await addTag(newTag, userID);
            // console.log('newTAG',newTag);
            if (response.data) {
                alert('Tag saved successfully!');
                setOpnNewTag(false);
                setTags((prevTags) => [...prevTags, { key: response.data.id, Tag: response.data.tag }]);
                setValue('WHAT');
            } else {
                alert('Failed to save tag.');
                // console.log('Error:', response);
            }
        } catch (error) {
            console.error('Error saving tag:', error);
        }
    }
    const handleChange = (setter: Dispatch<SetStateAction<any>>, value: string) => {
        setter(value);
    };

    const HandleClose = () => {
        setOpnNewTag(false);
    };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => HandleClose()}
            >
            <View style={basic.overlay}>
                <View style={basic.popupContainer}>
                        <Text style={basic.heading}>New tag: </Text>
                    <TextInput style={basic.input} value={newTag} maxLength={14} placeholder='Write your new tag here'
                    onChangeText={text => handleChange(setNewTag, text)}></TextInput>
                    <Button title="Save new tag" onPress={handleSaveTag} color="blue" />
                
                    <Text style={[basic.heading, { marginTop: 20 }]}>Delete tag: </Text>
                    <ScrollView style={basic.containerSecondary}>
                        <GetTags setSlctdInTag={setSlctdInTag} slctdInTag={slctdInTag} />
                    </ScrollView>
                    <Button title="Cancel" onPress={() => HandleClose()} color="gray" />
                </View>
            </View>
        </Modal>
    )
}

export{InputNewTag}