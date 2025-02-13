import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

import basic from '@/components/styles/basics';
import { addTag } from '@/services/notes.service';



export function InputNewTag({ setOpnNewTag, setTags, setValue}:{setOpnNewTag: Dispatch<SetStateAction<boolean>>; setTags: Dispatch<SetStateAction<{key: number, Tag: string}[]>>; setValue: Dispatch<SetStateAction<string>>}) {
    const [newTag, setNewTag] = useState('');
    const [text, setText] = useState('');

    
    const handleSaveTag = async () => {
        try {

            const userID = 1; // Placeholder user ID, replace with actual authentication
            const response = await addTag(newTag, userID);
            console.log('newTAG',newTag);
            if (response.data) {
                alert('Tag saved successfully!');
                setOpnNewTag(false);
                setTags((prevTags) => [...prevTags, { key: response.data.id, Tag: response.data.tag }]);
                setValue('WHAT');
            } else {
                alert('Failed to save tag.');
                console.log('Error:', response);
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
                    <TextInput style={basic.input} value={newTag} maxLength={14}
                    onChangeText={text => handleChange(setNewTag, text)}></TextInput>
                    <Button title="Cancel" onPress={() => HandleClose()} color="gray" />
                    <Button title="Save" onPress={handleSaveTag} color="blue" />
                </View>
            </View>
        </Modal>
    )
}

export{InputNewTag}