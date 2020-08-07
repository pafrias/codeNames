# codeNames

On Amazon EC2

```
sudo -s
yum update
yum install git

# install redis
amazon-linux-extras install redis4.0


#install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm i --lts

git clone https://github.com/pafrias/codeNames
cd codeNames
npm i
npm i -g pm2

redis-server --daemonize yes
pm2 start index.js
```