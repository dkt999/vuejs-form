import { io } from "socket.io-client";
const token = localStorage.getItem("token");
const serverSocet = import.meta.env.VITE_SERVER_SOCKET;
const socket = io(serverSocet, {
  auth: { token },
  transports: ["websocket"], // Tùy chọn: websocket hoặc polling
  reconnection: true, // Tự động kết nối lại
  reconnectionAttempts: 5, // Số lần thử lại
  reconnectionDelay: 2000, // Thời gian delay giữa các lần thử lại
});
// Khi kết nối thành công, gửi registerSession
socket.on("connect", () => {
    console.log("🔗 Connected to Socket.IO:", socket.id);
    socket.emit("registerSession", {
        device: navigator.userAgent, // Lấy thông tin thiết bị
        ip: "192.168.1.2" // (Tuỳ chỉnh: lấy IP từ API)
    });
});
export default socket;