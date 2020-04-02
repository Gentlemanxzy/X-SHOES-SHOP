package com.xss.service.impl;

import java.util.List;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xss.mapper.UserMapper;
import com.xss.pojo.Contact;
import com.xss.pojo.ShopAddress;
import com.xss.pojo.User;
import com.xss.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	public int updateUserInfo(User user) {
		int i = userMapper.updateUserInfo(user);
		
		return i;
	}

	public List<ShopAddress> getShopArea(String userId) {
		
		return userMapper.getShopArea(userId);
	}

	@Override
	public int addShopAddr(ShopAddress sAddress) {
		
		return userMapper.addShopAddr(sAddress);
	}

	@Override
	public int updateIsMain(String userId) {
		
		return userMapper.updateIsMain(userId);
	}

	@Override
	public int delAddr(String addId) {
		
		return userMapper.delAddr(addId);
	}

	@Override
	public ShopAddress getAddrByAddId(String addId) {
		
		return userMapper.getAddrByAddId(addId);
	}

	@Override
	public int updateAddr(ShopAddress sAddress) {
		return userMapper.updateAddr(sAddress);
	}

	@Override
	public int commitComment(Contact info) {
		int i = userMapper.commitComment(info);
		
		if(i>=1) { 	// 插入成功
			//发送 邮件
			String email = info.getEmail();
			String name = info.getName();
			
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
	        
	        String html = "<html><head><title>XSS</title></head>"
	        		+ "<body><h1 style='text-align:center;'>感谢您的反馈</h1><hr>"
	        		+ "<div>您好，"+name+",我们已经收到您的反馈啦，感谢！---XD</div><br>"
	        		+ "<p style='text-align:right;'>FROM XSS</p>"
	        		+ "</body></html>";
	        
	        Message msg = new MimeMessage(session);
	        try {
	        	msg.setSubject("亲爱的"+name+"，您好————来自XSS");
//	 	        msg.setText("您好，"+name+",我们已经收到您的反馈啦，感谢！---XD");
	 	        msg.setContent(html, "text/html;charset=utf-8");
	 	        msg.setFrom(new InternetAddress("alubbar@163.com"));	//发件人邮箱(我的163邮箱)
	 	        msg.setRecipient(Message.RecipientType.TO,
	 	                new InternetAddress(email)); 		//收件人邮箱(我的QQ邮箱)
	 	        msg.saveChanges();
			} catch (Exception e) {
				System.err.println("创建Message出现异常");
				i=-1;
			}
	        
	        if(i>=1) {
		        Transport transport = null;
		        try {
		        	transport = session.getTransport();
		        	transport.connect("alubbar@163.com","xzy123123");//发件人邮箱,授权码(可以在邮箱设置中获取到授权码的信息)
		        	transport.sendMessage(msg, msg.getAllRecipients());
		        	System.out.println("邮件发送成功...");
		        	transport.close();
				} catch (Exception e) {
					System.err.println("传输失败");
					i=-1;
				}
	        }
		}
		return i;
	}
}
