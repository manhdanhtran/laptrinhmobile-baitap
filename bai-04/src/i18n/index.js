import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    studentListTitle: "Students",
    emptyList: "No students found. Add one!",
    addStudent: "Add",
    editStudent: "Edit",
    deleteStudent: "Delete",
    addStudentTitle: "Add student",
    editStudentTitle: "Edit student",
    fullName: "Full Name",
    studentCode: "Student Code",
    email: "Email",
    avatar: "Avatar",
    avatarUrlPlaceholder: "Image URL",
    chooseFromDevice: "Choose from device",
    save: "Save",
    cancel: "Cancel",
    confirmEditTitle: "Edit Student",
    confirmEditMsg: "Do you want to edit this student's information?",
    confirmDeleteTitle: "Delete Student",
    confirmDeleteMsg: "Do you want to delete this student's information?",
    yes: "Yes",
    no: "No",
    errorRequired: "This field is required",
    errorEmail: "Invalid email format",
    errorDuplicateCode: "Student code already exists",
    errorAvatarRequired: "Avatar is required",
    permissionDenied: "Permission to access photo library was denied",
    errorTitle: "Error",
    errorUnknown: "An unexpected error occurred"
  },
  vi: {
    studentListTitle: "Danh sách Sinh viên",
    emptyList: "Chưa có sinh viên nào. Hãy thêm mới!",
    addStudent: "Thêm",
    editStudent: "Sửa",
    deleteStudent: "Xóa",
    addStudentTitle: "Thêm sinh viên",
    editStudentTitle: "Sửa sinh viên",
    fullName: "Họ và tên",
    studentCode: "Mã số SV",
    email: "Email",
    avatar: "Ảnh đại diện",
    avatarUrlPlaceholder: "URL hình ảnh",
    chooseFromDevice: "Chọn từ thiết bị",
    save: "Lưu",
    cancel: "Hủy",
    confirmEditTitle: "Sửa Sinh viên",
    confirmEditMsg: "Bạn có muốn sửa thông tin SV không?",
    confirmDeleteTitle: "Xóa Sinh viên",
    confirmDeleteMsg: "Bạn có muốn xóa thông tin SV không?",
    yes: "Có",
    no: "Không",
    errorRequired: "Trường này là bắt buộc",
    errorEmail: "Định dạng email không hợp lệ",
    errorDuplicateCode: "Mã số SV đã tồn tại",
    errorAvatarRequired: "Ảnh đại diện là bắt buộc",
    permissionDenied: "Không có quyền truy cập thư viện ảnh",
    errorTitle: "Lỗi",
    errorUnknown: "Đã xảy ra lỗi không xác định"
  }
};

const i18n = new I18n(translations);
i18n.enableFallback = true;

// Locale detection
export const updateLocale = () => {
  const locales = getLocales();
  if (locales && locales.length > 0) {
    const languageCode = locales[0].languageCode;
    i18n.locale = languageCode === 'vi' ? 'vi' : 'en';
  } else {
    i18n.locale = 'en';
  }
};

updateLocale(); // initial call

export default i18n;
