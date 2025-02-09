import { View, Modal, Pressable, Text, Alert } from 'react-native';
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
                              <Pressable
                                  onPress={() => {sendDeleteNote(note?.id ?? 0, setNotes);setOpnNote(null)}}
                                  onPressIn={() => setIsPressed(true)}
                                  onPressOut={() => setIsPressed(false)}
                                  style={[
                                      noteStyle.deleteButton,
                                      isPressed && noteStyle.deleteButtonPressed,
                                  ]}
                              >
                                  <Text style={noteStyle.closeText}>DELETE</Text>
                              </Pressable>
                              <Pressable
                                  onPress={() => {
                                      setWhichReturn('edit');
                                      console.log(whichReturn,'EDIT pressed');
                                  }}
                                  onPressIn={() => setIsPressed(true)}
                                  onPressOut={() => setIsPressed(false)}
                              >
                                  <Text style={noteStyle.closeText}>EDIT</Text>
                              </Pressable>
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