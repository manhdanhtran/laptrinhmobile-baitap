import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
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

      <Text style={styles.footer}>Trần Mạnh Danh - BIT240053</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },

  boxGroup: {
    gap: 12, // Khoảng cách giữa các hàng
  },

  row: {
    flexDirection: 'row',  
    height: 140,
    gap: 12,
  },

  row3: {
    flexDirection: 'row',  
    height: 155,
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

  footer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
});