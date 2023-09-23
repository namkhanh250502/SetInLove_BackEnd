# Bài 1: Hướng dẫn tạo ứng dụng nodejs đầu tiên

## 1. Yêu cầu

- [Cài đặt môi trường nodejs](https://nodejs.org/en/download/)
- [Cài đặt VScode (code editing)](https://code.visualstudio.com/)
## 2. Lưu ý

- Các ảnh minh họa được chụp từ hệ điều hành MacOS có thể hiển thị sẽ khác Window, nhưng cú pháp thì giống nhau

## 3. Tạo file quản lý các gói cài đặt của dự án: package.json

- Tạo thư mục bai1, Mở terminal hoặc gitbash chạy lệnh sau
```
    npm init
```
- npm là viết tắt của **Node Package Mananager**
- Cửa sổ terminal sẽ yêu cầu nhập các thông tin, mình có thể nhập hoặc bỏ qua bằng cách nhấn enter
- Sau khi hoàn tất sẽ tạo ra file package.json
- Các nội dung được nhập ở terminal sẽ tương ứng với các thuộc tính trong file package.json, như hình minh họa ở dưới

![Step 1][step01]

## 4. Các thông tin cơ bản của file package.json

+ name: là tên của dự án
+ version: là phiên bản của dự án
+ description: là mô tả của dự án
+ main: là file chạy chính của dự án khi được build

### 4.1 Thao tác với scripts

+ scripts: là các câu lệnh được cài đặt sẵn phục vụ cho việc chạy dự án, tạo thêm vài câu lệnh khác như sau

```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "echo \"Đang chạy câu lệnh start\" ",
        "build": "echo \"Đang chạy câu lệnh build\" "
    },
```
+ Chạy câu lệnh start sẽ thực thi câu lệnh được khai báo 
```
    npm start
```
![Step 3][step03]

+ Chạy câu lệnh build 
```
    npm run build
```

![Step 2][step02]

+ => Các script khác ngoài start thì đều phải thêm từ khóa run mới thực thi được
+ Ngoài ra có thể chạy script bằng cách chạy yarn thay vì npm, để sử dụng yarn thì cần cài đặt yarn trước
```
    npm i -g yarn
```
+ => Sau đó chạy lệnh ở script bằng cú pháp sau, khi chạy bằng yarn thì không phải thêm từ khóa run
```
    yarn build
```

### 4.2 Thao tác với dependencies

dependencies: Là nơi chứa các package cần dùng của dự án

+ Để thêm mới 1 package, chạy câu lệnh npm install <Tên package> hoặc npm i <Tên package>
```
    npm install express
    hoặc
    npm i express
    hoặc
    yarn add express
```
=> Sau khi cài đặt sẽ hiển thị trong mục dependencies

![Step 4][step04]

+ Để xóa 1 package, chạy câu lệnh npm uninstall <Tên package> hoặc yarn remove <Tên package>
```
    npm uninstall express
    hoặc
    yarn remove express
```
### 4.3 Thao tác với devDependencies

devDependencies: Là nơi chứa các package cần dùng của dự án khi triển khai với môi trường development
+ Để thêm mới 1 package, chạy câu lệnh npm install <Tên package> --save-dev hoặc npm i <Tên package> --save-dev
```
    npm install @types/express --save-dev
    hoặc
    npm i @types/express --save-dev
    hoặc
    yarn add @types/express -D
```
=> Sau khi cài đặt sẽ hiển thị trong mục devDependencies

![Step 5][step05]

+ Xóa package cũng tương tự như trên

## 5. Tạo ứng dụng express đơn giản

+ Cài đặt package express
+ Tạo file index.js

![Step 6][step06]

+ Mở terminal, Chạy dự án bằng lệnh:
```
    node index
    hoặc
    node index.js
    hoặc
    node .
```
(nếu tạo file khác index.js, ví dụ test.js thì chạy lệnh **node test.js**)

+ Sau khi chạy, terminal sẽ hiển thị log như sau

![Step 7][step07]

+ Để chạy dự án trên trình duyệt, gõ link [localhost:3000](http://localhost:3000)

![Step 8][step08]

3000 chính là port được khai báo trong dự án

+ Để hiển thị thông tin khác thay vì chữ **"Cannot GET /"** trên trình duyệt ta thêm đoạn code sau

![Step 9][step09]

=> Chạy lại dự án bằng cách:
+ b1. Tắt server đang chạy bằng lệnh: ctrl + C
+ b2: node index
+ b3: Tải lại trình duyệt và xem kết quả

![Step 10][step10]

## 6. Tích hợp nodemon

Sử dụng nodemon để sau khi sửa code không phải chạy lại server
+ b1. Cài package
```
    yarn add nodemon
```
+ b2. Sửa câu lệnh script  

![Step 11][step11]

+ b3. Chạy lại server bằng lệnh:
```
    yarn start
    hoặc
    npm start
```
=> Kết quả, sau mỗi lần sửa thông tin trong code thì server sẽ tự động cập nhật, mà không phải chạy lại server

## Support
- [ ] [Email](mailto:lehoangnds@gmail.com)
- [ ] [Facebook](https://fb.com/lehoangnd)
- [ ] [Telegram](https://t.me/lehoangnd)

## Authors and acknowledgment
Lê Hoàng

## License
Leatech JSC

[step01]: assets/bai1/bai-1-01.png
[step02]: assets/bai1/bai-1-02.png
[step03]: assets/bai1/bai-1-03.png
[step04]: assets/bai1/bai-1-04.png
[step05]: assets/bai1/bai-1-05.png
[step06]: assets/bai1/bai-1-06.png
[step07]: assets/bai1/bai-1-07.png
[step08]: assets/bai1/bai-1-08.png
[step09]: assets/bai1/bai-1-09.png
[step10]: assets/bai1/bai-1-10.png
[step11]: assets/bai1/bai-1-11.png