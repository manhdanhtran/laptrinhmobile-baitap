import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStudentById } from '../storage/studentStorage';
import { getAvatarUri } from '../storage/avatarStorage';
import Avatar from '../components/Avatar';
import i18n from '../i18n';

const StudentDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [student, setStudent] = useState(null);

  // Load student by id on focus
  useFocusEffect(
    useCallback(() => {
      const loadStudent = async () => {
        try {
          const data = await getStudentById(id);
          if (data) setStudent(data);
        } catch (error) {
          Alert.alert(i18n.t('errorTitle'), i18n.t('errorUnknown'));
        }
      };
      loadStudent();
    }, [id])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: student ? student.fullName : '',
    });
  }, [navigation, student]);

  if (!student) return <View style={styles.container} />;

  const avatarUri = getAvatarUri(student);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar uri={avatarUri} size={120} />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>{i18n.t('fullName')}</Text>
        <Text style={styles.value}>{student.fullName}</Text>
        
        <Text style={styles.label}>{i18n.t('studentCode')}</Text>
        <Text style={styles.value}>{student.studentCode}</Text>
        
        <Text style={styles.label}>{i18n.t('email')}</Text>
        <Text style={styles.value}>{student.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  avatarContainer: { alignItems: 'center', marginVertical: 24 },
  infoBox: { marginBottom: 30 },
  label: { fontSize: 14, color: '#666', marginTop: 12 },
  value: { fontSize: 18, color: '#333', fontWeight: '500', marginTop: 4 }
});

export default StudentDetailScreen;
