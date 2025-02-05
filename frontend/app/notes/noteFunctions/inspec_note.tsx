import { View, Modal, Pressable, Text, Alert } from 'react-native';
import React, { useState, Dispatch, SetStateAction } from 'react';
import {basic} from '@/components/styles/basics'; 
import {noteStyle} from '@/components/styles/noteStyle';
import {deleteNotes} from '@/services/notes.service';

interface Note {
    id: number;
    note_h1: string;
    note: string;
    img: string;
    date: string;
  }
function BigModal({ note, setOpnNote, setNotes}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; setNotes: Dispatch<SetStateAction<Note[]>> }) {

const sendDeleteNote = async (id: number, setNotes: Dispatch<SetStateAction<Note[]>>) => {
    console.log('sendDeleteNote called with id:', id);
    try{
        const result = await deleteNotes(id);
            if (result) {
              Alert.alert('Note deleted successfully!');
              setNotes(notes => notes.filter(note => note.id !== id));
            } else {
              Alert.alert('Failed to delete note.');
            }
          } catch (error) {
            console.error('Error deleting note:', error);
          }
  }


    const [isPressed, setIsPressed] = useState(false);
    return (
      <View style={basic.overlay}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={note !== null}
          onRequestClose={() => setOpnNote(null)}
          style={noteStyle.inspectionModal}>
          <View style={basic.centeredView}>
            <View style={basic.modalView}>
            <Pressable
                onPress={() => setOpnNote(null)}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={[
                  noteStyle.closeButton,
                  isPressed && noteStyle.closeButtonPressed,
                ]}
              >
                <Text style={noteStyle.closeText}>Close</Text>
              </Pressable>
              <Text style={noteStyle.noteH1}>{note?.note_h1}</Text>
              <Text style={noteStyle.noteText}>{note?.note}</Text>
              <Text style={noteStyle.noteText}>{note?.date}</Text>
              <Pressable
                onPress={() => {note && sendDeleteNote(note.id, setNotes);console.log('Note object:', note);setOpnNote(null)}}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={[
                  noteStyle.deleteButton,
                  isPressed && noteStyle.deleteButtonPressed,
                ]}>
                <Text style={noteStyle.closeText}>DELETE</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
export default BigModal;