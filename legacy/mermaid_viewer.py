import http.server
import socketserver
import sys
import os
import json
import time
import threading
import webbrowser
from functools import partial

# Configuration
PORT = 8000
WATCH_INTERVAL = 1.0  # Seconds

class MermaidHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, target_file=None, **kwargs):
        self.target_file = target_file
        # Set the directory to serve files from (where the script is located)
        # This allows serving styles and templates relative to the script
        directory = os.path.dirname(os.path.abspath(__file__))
        super().__init__(*args, directory=directory, **kwargs)

    def do_GET(self):
        if self.path == '/data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            try:
                with open(self.target_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                mtime = os.stat(self.target_file).st_mtime
                data = {'content': content, 'mtime': mtime}
            except FileNotFoundError:
                data = {'content': 'File not found', 'mtime': 0}
            
            self.wfile.write(json.dumps(data).encode())
        elif self.path == '/':
            # Serve the specific template file for the root path
            self.path = '/templates/index.html'
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            # Serve other static files (css, js, etc.) normally
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

def open_browser():
    """Wait a bit for the server to start, then open the browser."""
    time.sleep(1)
    webbrowser.open(f'http://localhost:{PORT}')

def main():
    if len(sys.argv) < 2:
        print("Usage: python mermaid_viewer.py <path_to_mermaid_file>")
        sys.exit(1)

    target_file = os.path.abspath(sys.argv[1])
    if not os.path.exists(target_file):
        print(f"Error: File '{target_file}' not found.")
        # We can still start, maybe the user will create it. 
        # But for now let's just warn.
    
    print(f"Starting Mermaid Viewer for: {target_file}")
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop.")

    # Create a partial handler to pass the target_file argument
    handler = partial(MermaidHandler, target_file=target_file)

    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            # Open browser in a separate thread to not block server startup
            threading.Thread(target=open_browser, daemon=True).start()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        sys.exit(0)
    except OSError as e:
        print(f"Error: {e}")
        print(f"Port {PORT} might be in use. Try killing the process using it or change the PORT in the script.")

if __name__ == "__main__":
    main()
