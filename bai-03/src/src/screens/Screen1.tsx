import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Errors = { userName?: string; mssv?: string };

const Screen1 = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState('');
  const [mssv, setMssv] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // Validate: trim() rồi kiểm tra rỗng, ô nào trống thì gán lỗi cho ô đó
  const handleClick = () => {
    const name = userName.trim();
    const id = mssv.trim();
    const newErrors: Errors = {};
    if (!name) newErrors.userName = 'Vui lòng nhập UserName';
    if (!id) newErrors.mssv = 'Vui lòng nhập MSSV';
    setErrors(newErrors);

    // Có lỗi thì không chuyển màn hình
    if (newErrors.userName || newErrors.mssv) return;

    // Truyền dữ liệu (đã trim) sang Screen 2 qua route params
    router.push({ pathname: '/screen2', params: { userName: name, mssv: id } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.container, { paddingTop: Math.max(insets.top, 60) }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Giao diện 6 ô màu giữ nguyên từ bài 2 */}
        <View style={styles.boxGroup}>
          {/* HÀNG 1 */}
          <View style={styles.row}>
            <View style={[styles.box, styles.blue, { flex: 1 }]}>
              <Text style={styles.num}>1</Text>
            </View>
          </View>
          {/* HÀNG 2 */}
          <View style={styles.row}>
            <View style={[styles.box, styles.red, { flex: 1 }]}>
              <Text style={styles.num}>2</Text>
            </View>
          </View>

          {/* HÀNG 3 */}
          <View style={styles.row}>
            <View style={[styles.box, styles.yellow, { flex: 1 }]}>
              <Text style={[styles.num, styles.dark]}>3</Text>
            </View>
            <View style={[styles.box, styles.green, { flex: 1 }]}>
              <Text style={styles.num}>4</Text>
            </View>
            {/* Ô số 5 */}
            <View style={[styles.box, styles.purple, { flex: 1 }]}>
              <Text style={styles.num}>5</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          {/* HÀNG 4 */}
          <View style={styles.row3}>
            <View style={[styles.box, styles.orange, { flex: 1 }]}>
              <Text style={styles.num}>6</Text>
            </View>
          </View>
        </View>

        {/* Ô nhập UserName và MSSV */}
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>UserName</Text>
            <TextInput
              style={[styles.input, errors.userName && styles.inputError]}
              placeholder="UserName"
              placeholderTextColor="#999999"
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
                // Gõ lại thì xóa lỗi của ô này
                if (errors.userName) setErrors((e) => ({ ...e, userName: undefined }));
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
            {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
          </View>

          <View>
            <Text style={styles.label}>MSSV</Text>
            <TextInput
              style={[styles.input, errors.mssv && styles.inputError]}
              placeholder="MSSV"
              placeholderTextColor="#999999"
              value={mssv}
              onChangeText={(text) => {
                setMssv(text);
                if (errors.mssv) setErrors((e) => ({ ...e, mssv: undefined }));
              }}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={handleClick}
            />
            {errors.mssv && <Text style={styles.errorText}>{errors.mssv}</Text>}
          </View>
        </View>

      </ScrollView>

      {/* Nút "Click me" ở bottom-center, cách đáy tối thiểu 24 và tránh safe area */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Pressable
          onPress={handleClick}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Click me</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1, // Nội dung cao tối thiểu bằng màn hình để form bị đẩy xuống đáy
    paddingTop: 50,
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 24, // Khoảng trống tối thiểu giữa 6 ô màu và form khi màn hình nhỏ
    justifyContent: 'space-between', // Ô màu ở trên, form sát dưới, khoảng trống ở giữa
  },

  boxGroup: {
    gap: 12, // Khoảng cách giữa các hàng
  },

  row: {
    flexDirection: 'row',
    height: 100,
    gap: 12,
  },

  row3: {
    flexDirection: 'row',
    height: 110,
    gap: 12,
  },

  box: {
    alignItems: 'center',      // Căn giữa theo chiều ngang
    justifyContent: 'center',  // Căn giữa theo chiều dọc
  },

  num: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },

  dark: {
    color: '#000000',
  },

  blue: { backgroundColor: '#2979FF' },
  red: { backgroundColor: '#E53935' },
  yellow: { backgroundColor: '#FDD835' },
  green: { backgroundColor: '#2BA55C' },
  purple: { backgroundColor: '#8E2DE2' },
  orange: { backgroundColor: '#F98500' },

  form: {
    gap: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#fff',
  },

  inputError: {
    borderColor: '#E53935',
  },

  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginTop: 4,
  },

  footer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },

  bottomBar: {
    alignItems: 'center', // Căn giữa nút theo chiều ngang
    paddingTop: 12,
  },

  button: {
    minWidth: 160,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#2979FF',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
