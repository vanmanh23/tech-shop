import nodemailer from "nodemailer";

export const sendLoginNotification = async (to: string, name?: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,       // tài khoản Gmail
      pass: process.env.EMAIL_PASS,       // mật khẩu ứng dụng
    },
  });

  await transporter.sendMail({
    from: `"TechShop " <${process.env.EMAIL_USER}>`,
    to,
    subject: "Thông báo đăng nhập thành công",
    html: `<p>Xin chào ${name || ""},</p>
           <p>Bạn vừa đăng nhập thành công vào TechShop lúc ${new Date().toLocaleString()}.</p>
           <p>Nếu không phải bạn, hãy đổi mật khẩu ngay!</p>`,
  });
};
