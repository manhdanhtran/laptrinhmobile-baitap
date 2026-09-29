# Quy ước repo nộp bài — Lập trình di động

Repo này dùng để nộp bài tập môn **Lập trình di động** (Tran Manh Danh, BIT240053, 24IT3).
Mỗi bài tập là một folder riêng theo quy ước dưới đây. Tuân theo đúng các quy ước này khi tạo/cập nhật bài.

## Cấu trúc folder bài tập

Mỗi bài nằm trong `bai-XX/` (XX là số thứ tự 2 chữ số, ví dụ `bai-01`, `bai-02`, ..., `bai-10`), gồm:

```
bai-XX/
├── src/            # source code của bài
├── screenshots/    # ảnh chụp giao diện
├── demo/           # video demo
└── README.md       # mô tả bài
```

## Quy ước đặt tên file

- Ảnh giao diện chính: `screenshots/main-screen.png`
- Video demo: `demo/demo.mp4`
  - **Bắt buộc dưới 50MB.**
  - Nếu file gốc lớn hơn 50MB, nén bằng ffmpeg trước khi commit:
    ```bash
    ffmpeg -i input.mp4 -vcodec libx264 -vf scale=-2:720 -crf 28 -an demo/demo.mp4
    ```
    (H.264, 720p, CRF 28, bỏ audio `-an` nếu audio không cần thiết. Nếu vẫn còn >50MB, tăng CRF hoặc giảm độ phân giải thêm.)

## Nội dung mỗi `bai-XX/README.md`

Phải có đủ các mục sau, theo đúng thứ tự:

1. Tên bài
2. Yêu cầu đề bài
3. Cách chạy (hướng dẫn cài đặt + lệnh chạy project)
4. Ảnh giao diện chính, hiển thị inline:
   ```markdown
   ![Màn hình chính](./screenshots/main-screen.png)
   ```
5. Link video demo:
   ```markdown
   [Xem video demo](./demo/demo.mp4)
   ```

## Cập nhật README root

Mỗi lần thêm bài mới, **phải** cập nhật bảng mục lục ở `README.md` tại root (thêm dòng mới, cập nhật trạng thái của bài vừa nộp thành ✅ Đã nộp).

## Commit message

Dùng format: `feat(bai-XX): <mô tả ngắn>`

Ví dụ: `feat(bai-03): thêm màn hình đăng nhập`

## Không được gitignore

`screenshots/` và `demo/` không bao giờ được thêm vào `.gitignore`, kể cả khi chứa file media.
