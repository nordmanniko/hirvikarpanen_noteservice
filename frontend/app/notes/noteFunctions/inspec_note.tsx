import { View, Modal, Pressable, Text, Alert } from 'react-native';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

import {deleteNotes} from '@/services/notes.service';
import HandleClose from '../writeanote';
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
          onRequestClose={() => <HandleClose />}
      >
          <View style={basic.overlay}>
              <View style={basic.inspectionModal}>
                  <View style={basic.modalView}>
                      {whichReturn === 'normal' ? (
                          <>
                              <Pressable
                                  onPress={() => {sendDeleteNote(note?.id, setNotes);setOpnNote(null)}}
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
                          <EditNote note={note} setOpnNote={setOpnNote} notes={notes} setNotes={setNotes}  whichReturn={whichReturn}/>
                      ) : null}
                  </View>
              </View>
          </View>
      </Modal>
  );
  }
  
export default BigModal;