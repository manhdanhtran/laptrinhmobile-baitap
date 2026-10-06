import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllStudents } from '../storage/studentStorage';
import { getAvatarUri } from '../storage/avatarStorage';
import { confirmDeleteStudent } from '../utils/confirmDeleteStudent';
import Avatar from '../components/Avatar';
import i18n from '../i18n';

const StudentListScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const insets = useSafeAreaInsets();

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Reload data from AsyncStorage every time the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, [])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('studentListTitle'),
      headerRight: undefined, // Remove Add button from header
    });
  }, [navigation]);

  const handleEdit = (id) => {
    navigation.navigate('StudentForm', { mode: 'edit', id });
  };

  const handleDelete = (student) => {
    confirmDeleteStudent(student, loadStudents);
  };

  const renderItem = ({ item }) => {
    const avatarUri = getAvatarUri(item);
    return (
      <View style={styles.card}>
        {/* Left side: Avatar, Name, Student Code - tapping opens Detail screen */}
        <TouchableOpacity 
          style={styles.cardBody} 
          onPress={() => navigation.navigate('StudentDetail', { id: item.id })}
          activeOpacity={0.7}
        >
          <Avatar uri={avatarUri} size={50} />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{item.fullName}</Text>
            <Text style={styles.code} numberOfLines={1}>{item.studentCode}</Text>
          </View>
        </TouchableOpacity>

        {/* Right side: Delete on top, Edit below */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.deleteBtn]} 
            onPress={() => handleDelete(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>{i18n.t('deleteStudent')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionBtn, styles.editBtn]} 
            onPress={() => handleEdit(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>{i18n.t('editStudent')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {students.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{i18n.t('emptyList')}</Text>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 80 }
          ]}
        />
      )}

      {/* Fixed bottom center Add button */}
      <View 
        pointerEvents="box-none" 
        style={[styles.fabWrapper, { bottom: insets.bottom + 16 }]}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('StudentForm', { mode: 'add' })}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>{i18n.t('addStudentTitle')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContent: { padding: 16 },
  card: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12
  },
  infoContainer: { marginLeft: 16, flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  code: { fontSize: 14, color: '#666', marginTop: 4 },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionBtn: {
    width: 64,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteBtn: {
    backgroundColor: '#D9534F',
    marginBottom: 6
  },
  editBtn: {
    backgroundColor: '#2E86C1'
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999' },
  fabWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default StudentListScreen;
