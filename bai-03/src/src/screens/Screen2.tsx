import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Kiểu params nhận từ Screen 1
export type Screen2Params = {
  userName?: string;
  mssv?: string;
};

// Param có thể là mảng hoặc không có (vd: refresh trang trên web) -> trả về "—"
const show = (value?: string | string[]) => {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.trim() ? v : '—';
};

const Screen2 = () => {
  const router = useRouter();
  // Nhận dữ liệu được truyền từ Screen 1
  const { userName, mssv } = useLocalSearchParams<Screen2Params>();

  // Quay về Screen 1; nếu không có lịch sử (mở thẳng link trên web) thì thay bằng trang chủ
  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Nút quay lại ở góc top-left */}
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          hitSlop={8}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        {/* Dữ liệu hiển thị ở giữa màn hình */}
        <View style={styles.content}>
          <Text style={styles.text}>UserName: {show(userName)}</Text>
          <Text style={styles.text}>MSSV: {show(mssv)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // View bên trong vùng an toàn, làm gốc cho nút back định vị absolute
  inner: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.5,
  },

  content: {
    flex: 1,
    alignItems: 'center',      // Căn giữa theo chiều ngang
    justifyContent: 'center',  // Căn giữa theo chiều dọc
    paddingHorizontal: 24,
    gap: 12,
  },

  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
});
