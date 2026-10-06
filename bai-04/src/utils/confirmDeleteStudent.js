import { Alert } from 'react-native';
import { deleteStudent } from '../storage/studentStorage';
import { deleteLocalAvatar } from '../storage/avatarStorage';
import i18n from '../i18n';

/**
 * Shared helper for deleting a student:
 * 1. Shows confirmation Alert dialog with translated text.
 * 2. If confirmed, deletes the student from AsyncStorage.
 * 3. Deletes local avatar file from device storage if applicable.
 * 4. Calls onSuccess callback (e.g. refresh list or navigate back).
 */
export const confirmDeleteStudent = (student, onSuccess) => {
  if (!student) return;

  Alert.alert(
    i18n.t('confirmDeleteTitle'),
    i18n.t('confirmDeleteMsg'),
    [
      { text: i18n.t('no'), style: 'cancel' },
      {
        text: i18n.t('yes'),
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteStudent(student.id);
            if (student.avatarType === 'local' && student.avatar) {
              await deleteLocalAvatar(student.avatar);
            }
            if (onSuccess) {
              onSuccess();
            }
          } catch (error) {
            console.error('Error deleting student:', error);
            Alert.alert(i18n.t('errorTitle'), i18n.t('errorUnknown'));
          }
        }
      }
    ]
  );
};
