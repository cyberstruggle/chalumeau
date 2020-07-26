# tested on Ubuntu 18.04.3 LTS
PASSWORD=`date +%s | sha256sum | base64 | head -c 32`
sudo apt-get update

# python 
sudo apt-get install python3.7 python3.7-dev -y
sudo apt-get install python3-pip -y
sudo apt-get install virtualenv -y

virtualenv -p python3 env
./env/bin/pip install -r requirements.txt
./env/bin/python chalumeau.py migrate
./env/bin/python chalumeau.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('chalumeau', 'chalumeau@chalumeau.com', '$PASSWORD')"

echo "login with "
echo "username : chalumeau"
echo "password : $PASSWORD"