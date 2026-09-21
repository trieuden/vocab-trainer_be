# Backend Agent Rules (`vocab_trainer_be`)

Mọi Agent và Developer khi làm việc trên dự án Backend NestJS phải tuân thủ nghiêm ngặt các quy tắc sau:

1. **Base API Naming (Bắt buộc dùng POST, KHÔNG dùng GET)**:
   - Tuyệt đối không dùng phương thức `GET` cho bất kỳ API nào.
   - `list`: Lấy danh sách (dùng `POST list` -> tên hàm `list()` / `find()`).
   - `detail`: Lấy chi tiết (`POST detail` -> tên hàm `detail()` / `getDetail()`).
   - `update`: Cập nhật dữ liệu (`update(@Body() dto: UpdateDto)` nhận 1 DTO duy nhất, không tách rời param).
   - `delete`: Xóa dữ liệu (`remove` hoặc `delete`).

2. **Query Optimization (Object Boolean Select)**:
   - Khi dùng `select` và `relations` trong TypeORM, **bắt buộc** dùng cú pháp object boolean `{ id: true, code: true }` và `{ user: true }`. Tuyệt đối **không dùng mảng chuỗi** `["id", "code"]`.

3. **Không Enrich Data**:
   - Không lặp qua danh sách để query thêm dữ liệu (tránh N+1 query). Tất cả phải Join/Query trong 1 lượt.

4. **Không Seeder Data**:
   - Không viết logic auto-seed dữ liệu trong code. Mọi dữ liệu ban đầu phải chạy qua SQL migration / SQL script thủ công.

5. **Enum cho toàn bộ Text/Constant**:
   - Tất cả hằng số, loại, trạng thái phải dùng TypeScript `enum`. Không dùng string literal / magic string.

6. **Hạn chế dùng `as`**:
   - Tránh ép kiểu `as`. Sử dụng type/interface chuẩn, Generics hoặc Type Guards.

7. **Không đặt `Promise<T>` ở chữ ký hàm Controller & Service**:
   - NestJS & TypeScript tự unwrap Promise ở controller/service. Không khai báo `: Promise<T>`, giúp chữ ký hàm ngắn gọn.

8. **Bắt buộc dùng 1 DTO duy nhất cho mọi Request**:
   - Tất cả request vào phải thông qua Class DTO duy nhất với validation (`class-validator`) và `@ApiProperty`.
