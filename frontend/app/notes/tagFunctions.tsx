import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

import basic from '@/components/styles/basics';
import { addTag } from '@/services/notes.service';

const HandleClose = (setOnClose: Dispatch<SetStateAction<boolean>>) => {
    setOnClose(false);
  };
  
const handleSaveTag = async (newTag: string, setSlctdTag: Dispatch<SetStateAction<number>>) => {
    try {
        const userID = 1; // Placeholder user ID, replace with actual authentication
        const response = await addTag(newTag, userID);
        if (response.data) {
            setSlctdTag(response.data.id);
            alert('Tag saved successfully!');
        } else {
            alert('Failed to save tag.');
        }
    } catch (error) {
        console.error('Error saving tag:', error);
    }
}

export function InputNewTag({setSlctdTag}: {setSlctdTag: Dispatch<SetStateAction<number>>}) {
    const [newTag, setNewTag] = useState('');
    console.log('newTag:', newTag);
    return(
        <Modal>
                <Text style={basic.text}>New tag: </Text>
                <TextInput style={basic.input} onChangeText={setNewTag} value={newTag}></TextInput>
                <Button title="Save" onPress={() => {handleSaveTag(newTag, setSlctdTag)}} />
        </Modal>
    )
}

export{InputNewTag}