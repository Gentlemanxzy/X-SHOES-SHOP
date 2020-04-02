package com.xss.util;

import java.util.UUID;

public class Tools {
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "").toLowerCase();
	}
}
