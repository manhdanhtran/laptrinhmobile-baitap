# bt-buoi3 — Bài 03: Điều hướng 2 màn hình & truyền dữ liệu

Project Expo (SDK 57) + Expo Router + TypeScript.

## Chạy project

```bash
npm install
npx expo start        # quét QR bằng Expo Go trên iPhone
npx expo start --web  # hoặc chạy trên trình duyệt
```

## Cấu trúc chính

- `src/app/_layout.tsx` — Stack, ẩn header mặc định
- `src/app/index.tsx` — route `/` → Screen 1
- `src/app/screen2.tsx` — route `/screen2` → Screen 2
- `src/screens/Screen1.tsx` — 6 ô màu (bài 2) + form UserName/MSSV + nút "Click me"
- `src/screens/Screen2.tsx` — nút back (icon) + hiển thị dữ liệu nhận được
