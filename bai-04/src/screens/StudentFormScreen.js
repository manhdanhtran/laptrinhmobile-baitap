import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStudentById, addStudent, updateStudent, getAllStudents } from '../storage/studentStorage';
import { saveLocalAvatar, getAvatarUri } from '../storage/avatarStorage';
import Avatar from '../components/Avatar';
import i18n from '../i18n';

const StudentFormScreen = ({ route, navigation }) => {
  const { mode, id } = route.params; // mode: 'add' or 'edit'
  
  const [fullName, setFullName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [email, setEmail] = useState('');
  
  const [avatarType, setAvatarType] = useState('url'); // 'url' or 'local'
  const [avatarUrl, setAvatarUrl] = useState('');
  const [pickedLocalUri, setPickedLocalUri] = useState(null); // temp uri from picker
  const [existingAvatar, setExistingAvatar] = useState(null); // for edit mode

  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      title: mode === 'add' ? i18n.t('addStudentTitle') : i18n.t('editStudentTitle')
    });

    if (mode === 'edit' && id) {
      const loadStudent = async () => {
        try {
          const data = await getStudentById(id);
          if (data) {
            setFullName(data.fullName);
            setStudentCode(data.studentCode);
            setEmail(data.email);
            setAvatarType(data.avatarType);
            setExistingAvatar(data.avatar);
            if (data.avatarType === 'url') {
              setAvatarUrl(data.avatar);
            }
          }
        } catch (e) {
          Alert.alert(i18n.t('errorTitle'), i18n.t('errorUnknown'));
        }
      };
      loadStudent();
    }
  }, [mode, id, navigation]);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(i18n.t('errorTitle'), i18n.t('permissionDenied'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedLocalUri(result.assets[0].uri);
      setAvatarType('local');
      setAvatarUrl(''); // Choosing one option replaces the other
    }
  };

  const validate = async () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = i18n.t('errorRequired');
    if (!studentCode.trim()) newErrors.studentCode = i18n.t('errorRequired');
    
    // Email simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = i18n.t('errorRequired');
    } else if (!emailRegex.test(email)) {
      newErrors.email = i18n.t('errorEmail');
    }

    // Check avatar
    if (avatarType === 'url' && !avatarUrl.trim() && !existingAvatar) {
      newErrors.avatar = i18n.t('errorAvatarRequired');
    }
    if (avatarType === 'local' && !pickedLocalUri && !existingAvatar) {
      newErrors.avatar = i18n.t('errorAvatarRequired');
    }

    // Check unique studentCode
    try {
      const all = await getAllStudents();
      const duplicate = all.find(s => 
        s.studentCode.trim().toLowerCase() === studentCode.trim().toLowerCase() && 
        s.id !== id
      );
      if (duplicate) {
        newErrors.studentCode = i18n.t('errorDuplicateCode');
      }
    } catch (e) {
      console.error(e);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const performSave = async () => {
    try {
      let finalAvatarType = avatarType;
      let finalAvatarValue = '';

      if (avatarType === 'local' && pickedLocalUri) {
        // Copy picked image to persistent folder at the moment of saving
        finalAvatarValue = await saveLocalAvatar(pickedLocalUri);
      } else if (avatarType === 'url') {
        finalAvatarValue = avatarUrl.trim();
      } else if (mode === 'edit') {
        // Fallback to existing avatar if no new one was picked
        finalAvatarType = existingAvatar ? avatarType : 'url';
        finalAvatarValue = existingAvatar || '';
      }

      const studentData = {
        id: mode === 'add' ? Date.now().toString() + Math.random().toString(36).substring(7) : id,
        fullName: fullName.trim(),
        studentCode: studentCode.trim(),
        email: email.trim(),
        avatarType: finalAvatarType,
        avatar: finalAvatarValue
      };

      if (mode === 'add') {
        await addStudent(studentData);
        navigation.goBack();
      } else {
        await updateStudent(studentData);
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert(i18n.t('errorTitle'), i18n.t('errorUnknown'));
    }
  };

  const handleSave = async () => {
    const isValid = await validate();
    if (!isValid) return;

    if (mode === 'edit') {
      Alert.alert(
        i18n.t('confirmEditTitle'),
        i18n.t('confirmEditMsg'),
        [
          { text: i18n.t('no'), style: 'cancel' },
          { text: i18n.t('yes'), onPress: performSave }
        ]
      );
    } else {
      performSave();
    }
  };

  // Determine which URI to show in preview
  let previewUri = null;
  if (avatarType === 'local' && pickedLocalUri) {
    previewUri = pickedLocalUri;
  } else if (avatarType === 'url' && avatarUrl) {
    previewUri = avatarUrl;
  } else if (mode === 'edit' && existingAvatar && avatarType !== 'url') {
    previewUri = getAvatarUri({ avatarType, avatar: existingAvatar });
  } else if (mode === 'edit' && avatarType === 'url') {
    previewUri = avatarUrl;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarSection}>
        <Avatar uri={previewUri} size={100} />
        
        <Text style={styles.label}>{i18n.t('avatar')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('avatarUrlPlaceholder')}
          value={avatarType === 'url' ? avatarUrl : ''}
          onChangeText={(text) => {
            setAvatarUrl(text);
            setAvatarType('url');
            setPickedLocalUri(null); // Choosing one option replaces the other
          }}
          autoCapitalize="none"
        />
        
        <TouchableOpacity style={styles.pickerButton} onPress={handlePickImage}>
          <Text style={styles.pickerButtonText}>{i18n.t('chooseFromDevice')}</Text>
        </TouchableOpacity>
        {errors.avatar && <Text style={styles.errorText}>{errors.avatar}</Text>}
      </View>

      <Text style={styles.label}>{i18n.t('fullName')}</Text>
      <TextInput
        style={[styles.input, errors.fullName && styles.inputError]}
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

      <Text style={styles.label}>{i18n.t('studentCode')}</Text>
      <TextInput
        style={[styles.input, errors.studentCode && styles.inputError]}
        value={studentCode}
        onChangeText={setStudentCode}
        autoCapitalize="none"
      />
      {errors.studentCode && <Text style={styles.errorText}>{errors.studentCode}</Text>}

      <Text style={styles.label}>{i18n.t('email')}</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{i18n.t('save')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 4, fontWeight: '500' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, width: '100%'
  },
  inputError: { borderColor: '#FF3B30' },
  errorText: { color: '#FF3B30', fontSize: 12, marginTop: 4 },
  pickerButton: {
    marginTop: 10, padding: 10, backgroundColor: '#E6F4FE', borderRadius: 8, width: '100%', alignItems: 'center'
  },
  pickerButtonText: { color: '#007BFF', fontWeight: 'bold' },
  saveButton: {
    backgroundColor: '#007BFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default StudentFormScreen;
