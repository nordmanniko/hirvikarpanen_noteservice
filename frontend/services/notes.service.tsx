import api from './api';
import React, {useState} from 'react';

const getNotes = async (userID: number) => {
try {
    const response = await api.get(`/notes/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error('Error getting note:', error);
    return [];
  }
}
const deleteNotes = async (id: number) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    return [];
  }
}
const addNote = async (title: string, note: string, color: string, userID: number) => {
  try{
    const response = await api.post('/notes/', {
      "note_h1": title,
      "note": note,
      "color": color,
      "date": new Date().toLocaleDateString('pt-PT'), /*This stoopid*/
      "user_id": userID
    });
    return response;
    } catch (error) {
      console.error('Error adding note:', error);
      return [];
    }
  }
const editNote = async (id: number, title: string, note: string, userID: number) => {
  try {
    const response = await api.patch(`/notes/${id}`, {
      "note_h1": title,
      "note": note,
      "date": new Date().toLocaleDateString('pt-PT'), /*This stoopid*/
    });
    return response;
  } catch (error) {
    console.error('Error editing note:', error);
    return [];
  }
}
const getTags = async (userID: number) => {
  try {
      const response = await api.get(`/tags/user/${userID}`);
      return response;
    } catch (error) {
      console.error('Error getting note:', error);
      return [];
    }
}
export {getNotes, deleteNotes, addNote, editNote, getTags};