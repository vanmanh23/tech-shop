import nodemailer from "nodemailer";

export const sendLoginNotification = async (to: string, name?: string) => {
  // Check if email credentials are available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not configured. Skipping email notification.");
    return;
  }

  try {
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
  } catch (error) {
    console.error("Failed to send email notification:", error);
    // Don't throw the error, just log it
  }
};
