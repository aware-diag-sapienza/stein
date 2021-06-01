
from http.server import HTTPServer, CGIHTTPRequestHandler
import webbrowser
import os

web_dir = os.path.join(os.path.dirname(__file__),"")
os.chdir(web_dir)

###########################
###########################

port = 5000
host = "localhost"

###########################
###########################

httpd = HTTPServer((host, port), CGIHTTPRequestHandler)
print(f"Server started at http://{host}:{port} \n to quit press <ctrl-c>")
webbrowser.open_new_tab(f"http://{host}:{port}")
httpd.serve_forever()