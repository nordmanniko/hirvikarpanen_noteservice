import { View, Modal, Pressable, Text, Alert, SafeAreaView } from 'react-native';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

import {deleteNotes} from '@/services/notes.service';
import EditNote from '../noteFunctions/edit_note';

import basic from '@/components/styles/basics'; 
import noteStyle from '@/components/styles/noteStyle';

interface Note {
    id: number;
    note_h1: string;
    note: string;
    img: string;
    date: string;
  }
function BigModal({ note, setOpnNote, notes, setNotes}: { note: Note | null; setOpnNote: Dispatch<SetStateAction<Note | null>>; notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>> }) {

const sendDeleteNote = async (id: number, setNotes: Dispatch<SetStateAction<Note[]>>) => {
    console.log('sendDeleteNote called with id:', id);
    try {
        const result = confirm('Are you sure you want to delete this note? This action cannot be undone.');
        if (result == true) {
            const response = await deleteNotes(id);
            if (response) {
                Alert.alert('Note deleted successfully!');
                setNotes(notes => notes.filter(note => note.id !== id));
            } else {
                Alert.alert('Failed to delete note.');
            }
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        Alert.alert('An error occurred while deleting the note.');
    } finally {
        // Added a finally block to ensure proper closure of try-catch blocks
    }
  }
  

    const [isPressed, setIsPressed] = useState(false);
    const [whichReturn, setWhichReturn] = useState('normal');
    useEffect(() => {
      console.log('whichReturn updated to:', whichReturn);
  }, [whichReturn]);
    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={note !== null}
          onRequestClose={() => setOpnNote(null)}
      >
          <View style={basic.overlay}>
              <View style={noteStyle.inspection}>
                      {whichReturn === 'normal' ? (
                          <>
                            <Pressable
                                    style={noteStyle.backButton}
                                  onPress={() => {
                                      setOpnNote(null);setIsPressed(true);
                                  }}
                                  onPressIn={() => setIsPressed(true)}
                                  onPressOut={() => setIsPressed(false)}
                              >
                                  <Text style={noteStyle.textStyle}>Back</Text>
                              </Pressable>

                              <Text style={noteStyle.noteH1}>{note?.note_h1}</Text>
                              <Text style={noteStyle.noteText}>{note?.note}</Text>
                              <Text style={basic.text}>{note?.date}</Text>
                              <View style={noteStyle.modalButtonContainer}>
                              <Pressable
                                  onPress={() => {sendDeleteNote(note?.id ?? 0, setNotes);setOpnNote(null)}}
                                  onPressIn={() => setIsPressed(true)}
                                  onPressOut={() => setIsPressed(false)}
                                  style={[noteStyle.modalButton, basic.buttonOpen
                                  ]}
                              >
                                  <Text style={noteStyle.closeText}>DELETE</Text>
                              </Pressable>

                              <Pressable
                                  style={[noteStyle.modalButton, basic.buttonOpen]}
                                  onPress={() => {
                                      setWhichReturn('edit');
                                      console.log(whichReturn,'EDIT pressed');
                                  }}
                                  onPressIn={() => setIsPressed(true)}
                                  onPressOut={() => setIsPressed(false)}
                              >
                                  <Text style={noteStyle.closeText}>EDIT</Text>
                              </Pressable>
                              </View>
                          </>
                      ) : whichReturn === 'edit' ? (
                          <EditNote note={note} setOpnNote={setOpnNote} notes={notes} setNotes={setNotes}  setWhichReturn={setWhichReturn}/>
                      ) : null}
              </View>
          </View>
      </Modal>
  );
  }
  
export default BigModal;