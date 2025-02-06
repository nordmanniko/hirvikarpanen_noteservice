import { View, Modal, Pressable, Text, Alert, TextInput, Image } from 'react-native';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import basic from '@/components/styles/basics'; 
import HandleClose from '../writeanote';
import {editNote} from '@/services/notes.service';


import noteStyle from '@/components/styles/noteStyle';
import {deleteNotes} from '@/services/notes.service';

interface Note {
    id: number;
    note_h1: string;
    note: string;
    img: string;
  }
  
function EditNote({ note, setOpnNote, notes, setNotes, whichReturn}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>>; whichReturn: string }) {
    const [title, setTitle] = useState('');
    const [newNote, setNewNote] = useState('');
    useEffect(() => {
        if (note) {
            setTitle(note.note_h1);
            setNewNote(note.note);
        }
    }, [note]);

    const handleSave = async () => {
        if (title === note?.note_h1 && newNote === note?.note) {
            alert('You can’t save the same note. Please change the fields.');
            return;
        }
        try{
            const result = await editNote(note?.id, title, newNote, 1);
            console.log('Note changed:', result);
                if (result !== null) {
                  Alert.alert('Note changed successfully!');
                  setNotes(notes => notes.filter(note => note.id !== id));
                } else if (result === null) {
                  Alert.alert('Failed to change note.');
                }
              } catch (error) {
                console.error('Error changing note:', error);
              }
        setTitle('');
        setNewNote('');
        setOpnNote(null); // Close the modal after saving
    };

    const handleChange = (setter: Dispatch<SetStateAction<any>>, value: string) => {
        setter(value);
    };
    
    return (
        <>
                    <Text style={basic.modalText}>Edit note</Text>
                    <Text style={basic.modalText}>Title</Text>
                    <TextInput
                      style={basic.input}
                      onChangeText={text => handleChange(setTitle, text)}
                      value={title}
                    />
                    <Text style={basic.modalText}>Note</Text>
                    <TextInput
                      style={basic.textArea}
                      multiline={true}
                      onChangeText={text => handleChange(setNewNote, text)}
                      value={newNote}
                      numberOfLines={4}
                    />
                <View style={basic.modalButtonContainer}>
                  <Pressable
                    style={[basic.modalButton, basic.buttonOpen]}
                    onPress={handleSave}>
                    <Text style={basic.textStyle}>Save</Text>
                  </Pressable>
                  <Pressable
                    style={[basic.modalButton, basic.buttonClose]}
                    onPress={() => whichReturn === 'normal' ? setOpnNote(null) : null}>
                    <Text style={basic.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
        </>
    );
}
export default EditNote;