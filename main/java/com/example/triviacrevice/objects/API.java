package com.example.triviacrevice.objects;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import org.json.simple.JSONArray;

public class API {

	public static final String URL_HEADER = "http://cop4331mern.herokuapp.com/api/";

	public static String getAPICall(Endpoint endpoint, Map<String, String> arguments) {
		try {
			URL url = new URL(URL_HEADER + endpoint.toString());
			URLConnection con = url.openConnection();
			HttpURLConnection http = (HttpURLConnection)con;
			http.setRequestMethod("POST");
			http.setDoOutput(true);

			StringJoiner sj = new StringJoiner("&");
			for(Map.Entry<String, String> entry : arguments.entrySet()) {
				sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "=" + URLEncoder.encode(entry.getValue(), "UTF-8"));
			}

			byte[] out = sj.toString().getBytes(StandardCharsets.UTF_8);
			http.setFixedLengthStreamingMode(out.length);
			http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			http.connect();

			OutputStream os = http.getOutputStream();
			os.write(out);

			InputStream is = http.getInputStream();

			return new String(readNBytes(is, Integer.MAX_VALUE));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	private static byte[] readNBytes(InputStream is, int len) throws IOException {
		if (len < 0) {
			throw new IllegalArgumentException("len < 0");
		}

		final int MAX_BUFFER_SIZE = 8192;

		List<byte[]> bufs = null;
		byte[] result = null;
		int total = 0;
		int remaining = len;
		int n;
		do {
			byte[] buf = new byte[Math.min(remaining, MAX_BUFFER_SIZE)];
			int nread = 0;

			// read to EOF which may read more or less than buffer size
			while ((n = is.read(buf, nread, Math.min(buf.length - nread, remaining))) > 0) {
				nread += n;
				remaining -= n;
			}

			if (nread > 0) {
				if (MAX_BUFFER_SIZE - total < nread) {
					throw new OutOfMemoryError("Required array size too large");
				}
				total += nread;
				if (result == null) {
					result = buf;
				} else {
					if (bufs == null) {
						bufs = new ArrayList<>();
						bufs.add(result);
					}
					bufs.add(buf);
				}
			}
			// if the last call to read returned -1 or the number of bytes
			// requested have been read then break
		} while (n >= 0 && remaining > 0);

		if (bufs == null) {
			if (result == null) {
				return new byte[0];
			}
			return result.length == total ?
					result : Arrays.copyOf(result, total);
		}

		result = new byte[total];
		int offset = 0;
		remaining = total;
		for (byte[] b : bufs) {
			int count = Math.min(b.length, remaining);
			System.arraycopy(b, 0, result, offset, count);
			offset += count;
			remaining -= count;
		}

		return result;
	}

	public static String[] convertArray(JSONArray jarr) {
		String[] arr = new String[jarr.size()];
		int q = 0;
		for (Object obj : jarr) arr[q++] = obj.toString();
		return arr;
	}
}