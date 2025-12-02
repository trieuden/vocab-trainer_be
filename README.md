# Vocab Trainer - Backend
### Backend cho ứng dụng học từ vựng tiếng Anh, được xây dựng bằng NestJS.

## Mô tả
Đây là một dự án backend được xây dựng bằng NestJS, cung cấp các API cần thiết cho ứng dụng web học từ vựng. Dự án này quản lý người dùng, các bộ từ vựng, các từ riêng lẻ và tiến độ học tập của người dùng.

## Tính năng
- Xác thực người dùng: Đăng ký, đăng nhập bằng JWT (JSON Web Tokens).

- Quản lý từ vựng: Tạo, xem, cập nhật và xóa các bộ từ vựng (topics) và các từ.

- Học và ôn tập: API để lấy từ vựng cho các phiên học và theo dõi tiến độ của người dùng.

- Tìm kiếm: Tìm kiếm từ vựng và các bộ từ.

## Công nghệ sử dụng
- Framework: [NestJS](https://nestjs.com/)

- Ngôn ngữ: [TypeScript](https://www.typescriptlang.org/)

- Database: [PostgreSQL](https://www.postgresql.org/)

- ORM: [TypeORM](https://typeorm.io/)

- Xác thực: [Passport.js](https://www.passportjs.org/) với <mark> passport-jwt </mark>

- Validation: <mark>class-validator</mark>, <mark>class-transformer</mark>

## Cài đặt
### Clone the repository:

#### Bash

```bash
$ git clone https://github.com/trieuden/vocab-trainer_be.git
```
```bash
$ cd vocab-trainer_be
```
### Cài đặt các dependencies:

#### Bash

```bash
$ npm install
```
#### Cấu hình môi trường:
- Sao chép file .env.example thành .env và cập nhật các biến môi trường, đặc biệt là thông tin kết nối database.

#### Bash
```bash
$ cp .env.example .env
```
## Chạy ứng dụng
### Chạy ở chế độ development:

#### Bash
```bash
$ npm run start:dev
```
- Ứng dụng sẽ chạy tại http://localhost:3000.

### Build ứng dụng:

#### Bash
```bash
$ npm run build
```
### Chạy ở chế độ production:

#### Bash
```bash
$ npm run start:prod
```
----
### API Endpoints

#### Authentication
+ POST /auth/register: Đăng ký người dùng mới.

+ POST /auth/login: Đăng nhập và nhận JWT.

#### Users
+ GET /users/me: Lấy thông tin người dùng hiện tại (yêu cầu xác thực).

#### Words (Các từ vựng)
+ GET /words/: Lấy danh sách các từ trong một bộ.

... (Các endpoints khác cho việc cập nhật và xóa từ)

## Đóng góp
#### Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một Pull Request. Chúng tôi luôn hoan nghênh các ý kiến đóng góp để cải thiện sản phẩm.

1. Fork a project

2. Tạo một branch mới (git checkout -b feature/AmazingFeature)

3. Commit các thay đổi của bạn (git commit -m 'Add some AmazingFeature')</mark>

4. Push lên branch (git push origin feature/AmazingFeature)

5. Mở một Pull Request

## Giấy phép
#### Dự án này được cấp phép theo MIT License.
