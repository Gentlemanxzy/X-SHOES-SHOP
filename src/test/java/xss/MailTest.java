package xss;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailTest {

	public static void main(String[] args) throws Exception {
		Properties props = new Properties();
        props.setProperty("mail.smtp.auth", "true");
        props.setProperty("mail.transport.protocol", "smtp");
        props.put("mail.smtp.host","smtp.163.com");// smtp服务器地址
        
        // 创建验证器
 		Authenticator auth = new Authenticator() {
 			public PasswordAuthentication getPasswordAuthentication() {
 				return new PasswordAuthentication("xzy", "xzy");//发邮件的账号的验证
 			}
 		};
 		
 		Session session = Session.getInstance(props, auth);
        session.setDebug(true);
    
        Message msg = new MimeMessage(session);
        msg.setSubject("这是一个测试程序....");
        msg.setText("你好!这是我的第一个javamail程序---WQ");
        msg.setFrom(new InternetAddress("alubbar@163.com"));//发件人邮箱(我的163邮箱)
        msg.setRecipient(Message.RecipientType.TO,
                new InternetAddress("747636081@qq.com")); //收件人邮箱(我的QQ邮箱)
        msg.saveChanges();

        Transport transport = session.getTransport();
        transport.connect("alubbar@163.com","xzy123123");//发件人邮箱,授权码(可以在邮箱设置中获取到授权码的信息)
        
        transport.sendMessage(msg, msg.getAllRecipients());
        
        System.out.println("邮件发送成功...");
        transport.close();

	}

}
