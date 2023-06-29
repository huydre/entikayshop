const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Route xử lý yêu cầu thanh toán MOMO QR
app.post('/momo/qr-payment', async (req, res) => {
    try {
      // Thông tin thanh toán
      const orderInfo = 'Thanh toán qua MOMO';
      const amount = req.body.amount; // Số tiền thanh toán
      const partnerCode = 'YOUR_PARTNER_CODE';
      const partnerRefId = 'YOUR_PARTNER_REF_ID'; // Mã tham chiếu đơn hàng
      const notifyUrl = 'YOUR_NOTIFY_URL'; // URL nhận thông báo kết quả thanh toán từ MOMO
      const returnUrl = 'YOUR_RETURN_URL'; // URL chuyển hướng sau khi thanh toán thành công
  
      // Tạo request thanh toán QR
      const response = await axios.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', {
        partnerCode,
        partnerRefId,
        amount,
        returnUrl,
        notifyUrl,
        requestType: 'captureMoMoWallet',
        orderId: Date.now().toString(),
        orderInfo,
        requestId: Date.now().toString(),
        extraData: ''
      });
  
      // Trả về dữ liệu thanh toán MOMO QR
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi tạo yêu cầu thanh toán MOMO QR' });
    }
  });
  
  // Khởi động server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });