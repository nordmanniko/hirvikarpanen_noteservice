/backend
pip install -r requirements.txt
docker build -t myimage .
docker run -d --name noteService -p 80:80 myimage