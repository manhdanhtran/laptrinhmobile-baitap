import * as FileSystem from 'expo-file-system';

// Folder path (using FileSystem.documentDirectory which is persistent)
const AVATAR_DIR = FileSystem.documentDirectory + 'avatars/';

// Helper to ensure the directory exists
const ensureDirExists = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(AVATAR_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(AVATAR_DIR, { intermediates: true });
    }
  } catch (e) {
    console.error("Error creating avatar directory", e);
  }
};

// Copy from cache (pickedUri) to our document directory and return only the file name
export const saveLocalAvatar = async (pickedUri) => {
  try {
    await ensureDirExists();
    // Generate a unique file name using timestamp and random string
    const fileName = `avatar_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
    const newPath = AVATAR_DIR + fileName;
    
    await FileSystem.copyAsync({
      from: pickedUri,
      to: newPath
    });
    
    return fileName;
  } catch (e) {
    console.error("Error saving local avatar", e);
    throw e;
  }
};

// Resolve the full URI for display based on the CURRENT documentDirectory
// iOS container path changes, so we dynamically rebuild it
export const getAvatarUri = (student) => {
  if (!student || !student.avatar) return null;
  if (student.avatarType === 'url') {
    return student.avatar;
  }
  return AVATAR_DIR + student.avatar;
};

// Delete the file when a student is removed or avatar replaced
export const deleteLocalAvatar = async (fileName) => {
  if (!fileName) return;
  try {
    const filePath = AVATAR_DIR + fileName;
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(filePath);
    }
  } catch (e) {
    console.error("Error deleting local avatar", e);
  }
};
