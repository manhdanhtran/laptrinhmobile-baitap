# Bài 04: Quản lý sinh viên (React Native)

## Yêu cầu đề bài

Xây dựng ứng dụng Quản lý sinh viên (Student Management) bằng React Native & Expo với các tính năng:

1. **Quản lý sinh viên (CRUD):**
   - Danh sách sinh viên: hiển thị avatar, họ và tên, mã số sinh viên. Mỗi dòng có nút **Xóa** (màu đỏ) và **Sửa** (màu xanh dương).
   - Nút **Thêm sinh viên** hình viên thuốc (pill-shaped) màu xanh lá nằm cố định ở giữa đáy màn hình, luôn hiển thị cả khi danh sách trống.
   - Thêm / Sửa sinh viên: nhập Họ tên, Mã số SV (validate không rỗng, kiểm tra trùng mã), Email (validate regex email), và Ảnh đại diện (Avatar).
   - Màn hình Chi tiết sinh viên (`StudentDetailScreen`): chế độ thuần xem (read-only), hiển thị avatar lớn, họ tên, mã SV, email.
2. **Lưu trữ dữ liệu cục bộ:**
   - Dùng `@react-native-async-storage/async-storage` để lưu danh sách sinh viên dưới dạng JSON.
3. **Quản lý ảnh đại diện:**
   - Cho phép nhập URL hình ảnh hoặc chọn ảnh từ thư viện máy bằng `expo-image-picker`.
   - Ảnh chọn từ máy được copy sang thư mục bền vững (`documentDirectory`) qua `expo-file-system` ngay khi lưu form. Khi xóa sinh viên, file ảnh cục bộ tương ứng cũng được dọn dẹp.
4. **Hỗ trợ đa ngôn ngữ thụ động (Passive i18n):**
   - Hỗ trợ tiếng Việt (`vi`) và tiếng Anh (`en`) bằng `expo-localization` và `i18n-js`. Tự động nhận diện theo ngôn ngữ hệ thống của thiết bị.

## Công nghệ và thư viện

| Thư viện | Version | Vai trò |
|----------|---------|---------|
| `expo` | ~57.0.26 | Expo SDK 57 |
| `@react-navigation/native` | ^7.5.0 | Điều hướng ứng dụng |
| `@react-navigation/native-stack` | ^7.20.0 | Stack Navigator |
| `react-native-screens` | ~4.26.0 | Tối ưu hóa màn hình native |
| `react-native-safe-area-context` | ~5.7.0 | Xử lý Safe Area / thanh điều hướng hệ thống |
| `@react-native-async-storage/async-storage` | 2.2.0 | Lưu trữ cơ sở dữ liệu sinh viên cục bộ |
| `expo-image-picker` | ~57.0.20 | Chọn ảnh từ thư viện thiết bị |
| `expo-file-system` | ~57.0.7 | Quản lý lưu/xóa file ảnh cục bộ bền vững |
| `expo-localization` | ~57.0.2 | Nhận diện locale của thiết bị |
| `i18n-js` | ^4.5.3 | Đa ngôn ngữ (en/vi) |
| `react-native` | 0.86.3 | |
| `react` | 19.2.3 | |

## Cấu trúc thư mục

```
bai-04/
├── locales/
│   ├── en.json                   # Cấu hình tên app native tiếng Anh
│   └── vi.json                   # Cấu hình tên app native tiếng Việt
├── src/
│   ├── components/
│   │   └── Avatar.js             # Component hiển thị ảnh đại diện / placeholder
│   ├── i18n/
│   │   └── index.js              # Cấu hình từ điển song ngữ en/vi
│   ├── screens/
│   │   ├── StudentListScreen.js  # Danh sách SV, nút Thêm ở đáy, nút Sửa/Xóa từng item
│   │   ├── StudentDetailScreen.js# Chi tiết SV (chế độ xem read-only)
│   │   └── StudentFormScreen.js  # Form thêm mới / chỉnh sửa sinh viên
│   ├── storage/
│   │   ├── studentStorage.js     # Thao tác CRUD AsyncStorage
│   │   └── avatarStorage.js      # Thao tác lưu/xóa ảnh file system
│   └── utils/
│       └── confirmDeleteStudent.js # Helper xác nhận và xử lý xóa sinh viên
├── screenshots/                  # Ảnh chụp màn hình ứng dụng
├── demo/                         # Video demo ứng dụng
├── App.js                        # Điểm khởi chạy & cấu hình Stack Navigator
├── app.json                      # Cấu hình Expo và plugin
├── package.json
└── README.md
```

## Cách chạy

Yêu cầu: Node.js (>= 18), thiết bị di động có cài **Expo Go** (hoặc trình giả lập Android/iOS).

```bash
cd bai-04
npm install          # cài đặt dependencies nếu chưa có
npx expo start       # khởi động Expo Dev Server
```

- **Trên điện thoại:** Quét mã QR bằng Expo Go (Android) hoặc Camera mặc định (iOS). Đảm bảo máy tính và điện thoại cùng mạng Wi-Fi (hoặc dùng `npx expo start --tunnel`).
- **Trên máy ảo:** Nhấn `a` để mở Android Emulator, `i` để mở iOS Simulator, hoặc `w` để mở bản Web.

## Ảnh giao diện chính

![Màn hình chính](./screenshots/main-screen.png)

## Video demo

[Xem video demo] - Link drive
