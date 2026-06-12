const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

// 1. ĐƯA ROUTE TRANG CHỦ LÊN TRÊN ĐÂY
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// 2. Các tuyến đường API chính
app.use("/api/contacts", contactsRouter);

// 3. Middleware bắt lỗi 404 (Để ở đây là chuẩn, dưới các router hợp lệ)
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu.
  return next(new ApiError(404, "Resource not found"));
});

// 4. Middleware xử lý lỗi tập trung (Luôn đặt ở CUỐI CÙNG của file app)
app.use((err, req, res, next) => {
  // SỬA Ở ĐÂY: Đổi toàn bộ chữ 'error' thành 'err' cho đồng bộ với tham số đầu vào
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
