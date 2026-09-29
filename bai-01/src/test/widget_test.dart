import 'package:flutter_test/flutter_test.dart';

import 'package:bt_buoi1/main.dart';

void main() {
  testWidgets('Hiển thị đủ 6 ô số từ 1 đến 6', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    expect(find.byType(ColorBox), findsNWidgets(6));
    for (var i = 1; i <= 6; i++) {
      expect(find.text('$i'), findsOneWidget);
    }
  });
}
