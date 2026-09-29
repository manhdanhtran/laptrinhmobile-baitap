---
description: Nộp bài tập theo đúng quy ước trong CLAUDE.md
---

Nộp bài số **$ARGUMENTS** (gọi số này là `XX`, format 2 chữ số, ví dụ bài 3 -> `03`) theo đúng quy ước trong `CLAUDE.md`. Thực hiện tuần tự:

1. Đọc `CLAUDE.md` ở root để nắm quy ước hiện hành (đề phòng đã thay đổi).

2. Kiểm tra folder `bai-XX/` đã tồn tại chưa:
   - Nếu chưa, tạo cấu trúc `bai-XX/{src,screenshots,demo}/` và `bai-XX/README.md` theo template.
   - Nếu đã tồn tại, dùng nội dung hiện có.

3. Xác nhận với người dùng (hỏi nếu chưa rõ):
   - Tên bài
   - Yêu cầu đề bài
   - Cách chạy project
   - Source code đã có trong `src/` chưa
   - Ảnh giao diện chính đã có ở `screenshots/main-screen.png` chưa
   - Video demo đã có ở `demo/demo.mp4` chưa

4. Kiểm tra dung lượng `demo/demo.mp4` nếu tồn tại:
   - Nếu >= 50MB, dùng ffmpeg nén lại (H.264, 720p, CRF 28, bỏ audio nếu không cần):
     ```bash
     ffmpeg -i <input> -vcodec libx264 -vf scale=-2:720 -crf 28 -an demo/demo.mp4
     ```
   - Nếu ffmpeg chưa cài, dừng lại và hướng dẫn người dùng cài (không tự cài).

5. Viết/cập nhật `bai-XX/README.md` đầy đủ 5 mục theo CLAUDE.md (tên bài, yêu cầu, cách chạy, ảnh inline, link video).

6. Cập nhật bảng mục lục ở `README.md` root: thêm/cập nhật dòng của bài `XX`, đổi trạng thái thành ✅ Đã nộp.

7. Hiển thị cho người dùng xem lại:
   - Danh sách file sẽ được add (`git status`)
   - Nội dung `bai-XX/README.md`
   - Diff của `README.md` root

   **Chờ người dùng xác nhận** trước khi commit.

8. Sau khi được xác nhận, commit với message `feat(bai-XX): <mô tả ngắn>` (mô tả ngắn lấy từ tên bài, hỏi người dùng nếu cần) và hỏi có muốn push lên GitHub luôn không.
