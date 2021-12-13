import * as vscode from "vscode";
import * as nodemailer from "nodemailer";

// 读取配置文件
const configuration = vscode.workspace.getConfiguration();

// email type
type EmailType = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  to: string;
  subject: string;
};

function emailTo(html: string) {
  const emailConfig = configuration.get("emailConfig") as EmailType;
  const transporter = nodemailer.createTransport(emailConfig);

  // 发送者
  const from = emailConfig.auth.user;
  // 接受者，主题
  const { to, subject } = emailConfig;
  var mailOptions = { from, subject, to, html };
  try {
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        vscode.window.showInformationMessage(`发送失败`);
        return;
      }
      vscode.window.showInformationMessage(`发送成功`);
    });
  } catch (err) {
    vscode.window.showInformationMessage(`发送失败`);
  }
}

const sendEmail = (html: string) => {
  emailTo(html);
};

export default sendEmail;
