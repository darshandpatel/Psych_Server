package imageData;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import common.Constant;

public class ImageFetcherTest {
	
	ImageFetcher imageFetcher;
	String sessionID;

	@Mock
	HttpServletRequest request;
	@Mock
	HttpServletResponse response;
	
	@Before
	public void setUp() throws Exception {
	  MockitoAnnotations.initMocks(this);
	  imageFetcher = new ImageFetcher();
	}
	
    @Test
	public void testValidImageFetcher() throws ServletException, IOException, ParseException{
	
		request = mock(HttpServletRequest.class);
		response = mock(HttpServletResponse.class);
		
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		
		BufferedReader bufferedReader = mock(BufferedReader.class);
		when(request.getReader()).thenReturn(bufferedReader);
		when(response.getWriter()).thenReturn(printWriter);
		
		JSONObject jsonObj = new JSONObject();
		when(request.getParameter(Constant.TG_ID)).thenReturn("1");
		when(bufferedReader.readLine()).thenReturn(jsonObj.toString()).thenReturn(null);
		
		imageFetcher.doPost(request, response);
		
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(stringWriter.getBuffer().toString());
		JSONObject jsonObject = (JSONObject) obj;
		
		assertTrue(((JSONArray) jsonObject.get("images")).size() > 0);
		
		assertEquals(Constant.SUCCESS, (String) jsonObject.get(Constant.SAVE));
	
    }
	
	    
	@Test
	public void testInvalidTargetGroupId() throws ServletException, IOException, ParseException{
	
		request = mock(HttpServletRequest.class);
		response = mock(HttpServletResponse.class);
		
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		
		BufferedReader bufferedReader = mock(BufferedReader.class);
		when(request.getReader()).thenReturn(bufferedReader);
		when(response.getWriter()).thenReturn(printWriter);
	
		JSONObject jsonObj = new JSONObject();
		when(request.getParameter(Constant.TG_ID)).thenReturn("");
 		when(bufferedReader.readLine()).thenReturn(jsonObj.toString()).thenReturn(null);
 		
 		imageFetcher.doPost(request, response);
 		
 		JSONParser parser = new JSONParser();
 		Object obj = parser.parse(stringWriter.getBuffer().toString());
 		JSONObject jsonObject = (JSONObject) obj;
 	
 		assertEquals(Constant.UNSUCCESSFUL, (String) jsonObject.get(Constant.SAVE));

		
	}
}
