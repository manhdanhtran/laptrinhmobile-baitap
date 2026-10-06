import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDENTS_KEY = '@students';

// Read array -> modify -> JSON.stringify -> setItem
export const getAllStudents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STUDENTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading students", e);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
    const students = await getAllStudents();
    return students.find(s => s.id === id);
  } catch (e) {
    console.error("Error finding student", e);
    return null;
  }
};

export const addStudent = async (student) => {
  try {
    const students = await getAllStudents();
    const newStudents = [...students, student];
    await AsyncStorage.setItem(STUDENTS_KEY, JSON.stringify(newStudents));
    return newStudents;
  } catch (e) {
    console.error("Error adding student", e);
    throw e;
  }
};

export const updateStudent = async (student) => {
  try {
    const students = await getAllStudents();
    const newStudents = students.map(s => s.id === student.id ? student : s);
    await AsyncStorage.setItem(STUDENTS_KEY, JSON.stringify(newStudents));
    return newStudents;
  } catch (e) {
    console.error("Error updating student", e);
    throw e;
  }
};

export const deleteStudent = async (id) => {
  try {
    const students = await getAllStudents();
    const newStudents = students.filter(s => s.id !== id);
    await AsyncStorage.setItem(STUDENTS_KEY, JSON.stringify(newStudents));
    return newStudents;
  } catch (e) {
    console.error("Error deleting student", e);
    throw e;
  }
};
