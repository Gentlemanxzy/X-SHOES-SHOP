package xss;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.xss.pojo.User;

public class LambdaTest implements Comparator<User>{

	public static void main(String[] args) {
		new Thread(() -> System.out.println("lambda写法")).start();
		User user = new User();
		user.setUserId("100");
		user.setUserName("xzy");
		User user2 = new User();
		user2.setUserId("200");
		user2.setUserName("Jay");
		List<User> list = new ArrayList<User>();
		list.add(user);
		list.add(user2);
	}
	
	@Override
	public int compare(User u1, User u2) {
		//return Integer.getInteger(u1.getUserId()) - Integer.getInteger(u2.getUserId());
		return Integer.getInteger(u1.getUserId()).compareTo(Integer.getInteger(u2.getUserId()));
	}
	

}
