<%@ page import="java.io.File, java.io.FileNotFoundException, java.io.PrintWriter, java.Math.*"   %>
<%

String content = request.getParameter("content");
String filename = request.getParameter("filename");
String currentPath = config.getServletContext().getRealPath("/"); // + "group1/evaluation/";


if(content == null){
    out.println("{\"result\": \"error\", \"exception\": \"content parameter is null\"}");
    return;
}

if(filename == null){
    out.println("{\"result\": \"error\", \"exception\": \"filename parameter is null\"}");
    return;
}


try {
    //create folders of path
    File targetFile = new File(currentPath + filename);
    File parent = targetFile.getParentFile();
    if (!parent.exists() && !parent.mkdirs()) {
        throw new IllegalStateException("Couldn't create dir: " + parent);
    }

    PrintWriter pw = new PrintWriter(currentPath + filename);
    pw.print(content);
    pw.flush();
    pw.close();
    out.println("{\"result\": \"ok\"}");
} catch (FileNotFoundException e) {
    out.println("{\"result\": \"error\", \"exception\": '" + e + "'}");
} catch (Exception e) {
    out.println("{\"result\": \"error\", \"exception\": '" + e + "'}");
}

%>