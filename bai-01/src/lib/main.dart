import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

/// Khoảng cách giữa các ô.
const double gap = 8;

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'BT Buổi 1',
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: const Color(0xFFFAFAFA),
      body: SafeArea(
        // Giới hạn chiều rộng để giữ tỉ lệ như điện thoại trên trình duyệt
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 430),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                children: [
                  // Hàng 1: ô 1 và ô 2 bằng nhau
                  SizedBox(
                    height: screenHeight * 0.19,
                    child: const Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Expanded(
                          child: ColorBox(label: '1', color: Color(0xFF1E7BF7)),
                        ),
                        SizedBox(width: gap),
                        Expanded(
                          child: ColorBox(label: '2', color: Color(0xFFF23F3A)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: gap),

                  // Hàng 2: nửa trái là Row lồng (ô 3, ô 4), nửa phải là ô 5
                  SizedBox(
                    height: screenHeight * 0.185,
                    child: const Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Expanded(
                          // Row lồng để mép phải ô 4 thẳng với mép phải ô 1
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Expanded(
                                child: ColorBox(
                                  label: '3',
                                  color: Color(0xFFFDD719),
                                  textColor: Colors.black,
                                ),
                              ),
                              SizedBox(width: gap),
                              Expanded(
                                child: ColorBox(
                                  label: '4',
                                  color: Color(0xFF2BA85F),
                                ),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(width: gap),
                        Expanded(
                          child: ColorBox(label: '5', color: Color(0xFF7E3FE0)),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: gap),

                  // Hàng 3: ô 6 full width
                  SizedBox(
                    height: screenHeight * 0.16,
                    width: double.infinity,
                    child: const ColorBox(label: '6', color: Color(0xFFFA7A13)),
                  ),

                  // Đẩy dòng tên xuống đáy
                  const Spacer(),

                  // Họ tên - MSSV
                  const Padding(
                    padding: EdgeInsets.only(bottom: 24),
                    child: Text(
                      'Tran Manh Danh - BIT240053',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF424242),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Một ô màu có số ở giữa.
class ColorBox extends StatelessWidget {
  const ColorBox({
    super.key,
    required this.label,
    required this.color,
    this.textColor = Colors.white,
  });

  final String label;
  final Color color;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: color,
        borderRadius: const BorderRadius.all(Radius.circular(2)),
      ),
      child: Center(
        child: Text(
          label,
          style: TextStyle(
            fontSize: 56,
            fontWeight: FontWeight.bold,
            color: textColor,
          ),
        ),
      ),
    );
  }
}
