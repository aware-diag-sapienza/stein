<%@ page import="java.io.File, java.io.FileNotFoundException, java.io.PrintWriter, java.util.Arrays"   %>
<%

/*
Computes the list of files inside the folder
returns a json
*/

String path = config.getServletContext().getRealPath("/results");


try {
    
    File f = new File(path);
    File[] list = f.listFiles();
    String[] names = new String[list.length];
    String jsonArray = "[";
    for(int i=0; i<list.length; i++){
        if(list[i].getName().startsWith("stein-")){
            if(jsonArray.length() == 1) jsonArray += "\"" + list[i].getName() + "\"";
            else jsonArray += ", \"" + list[i].getName() + "\"";
        }
        
    }
    jsonArray += "]";

    out.println("{\"result\": \"ok\", \"files\": " + jsonArray + "}");
} catch (FileNotFoundException e) {
    out.println("{\"result\": \"error\", \"exception\": '" + e + "'}");
} catch (Exception e) {
    out.println("{\"result\": \"error\", \"exception\": '" + e + "'}");
}

%>