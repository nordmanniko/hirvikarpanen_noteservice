import { View, Modal, Pressable, Text, Alert, TextInput, Image } from 'react-native';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import basic from '@/components/styles/basics'; 
import HandleClose from '../writeanote';
import {editNote} from '@/services/notes.service';
import {LoadNotes} from '@/app/notes/notes';

//styles
import noteStyle from '@/components/styles/noteStyle';
import {deleteNotes} from '@/services/notes.service';

interface Note {
  id: number;
  note_h1: string;
  note: string;
  img: string;
  color: string;
  date: string;
}
  
function EditNote({ note, setOpnNote, notes, setNotes, setWhichReturn}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>>; whichReturn: string; setWhichReturn: Dispatch<SetStateAction<string>> }) {
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
            const result = await editNote(note?.id ?? 0, title, newNote, 1);
            console.log('Note changed:', result);
                if (result) {
                  setNotes(notes => notes.filter(note => note.id !== (note?.id ?? 0)));
                  console.log(notes,'Note changed successfully!');
                } else if (result == null) {
                  console.log('Failed to change note.');
                  return;
                }
              } catch (error) {
                console.error('Error changing note:', error);
                return;
              }
        setTitle('');
        setNewNote('');
        setOpnNote(null); // Close the modal after saving
        setWhichReturn('normal');
        LoadNotes({ notes, setNotes });
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
                <View style={noteStyle.modalButtonContainer}>
                  <Pressable
                    style={[noteStyle.modalButton, basic.buttonOpen]}
                    onPress={handleSave}>
                    <Text style={basic.textStyle}>Save</Text>
                  </Pressable>
                  <Pressable
                    style={[noteStyle.modalButton, basic.buttonClose]}
                    onPress={() => setWhichReturn('normal')}>
                    <Text style={basic.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
        </>
    );
}
export default EditNote;