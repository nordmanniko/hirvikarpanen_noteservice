import api from './api';
import React, {useState} from 'react';

const getNotes = async () => {
try {
    const response = await api.get('/notes/user'/*toi 1 täytyy vaihtaa get user id*/);//userid pitää vaihtaa lähetettyyn?
    return response.data;
  } catch (error) {
    console.error('Error getting note:', error);
    return [];
  }
}
export default getNotes;