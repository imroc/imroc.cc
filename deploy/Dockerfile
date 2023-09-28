FROM ubuntu:22.04

# basic tools
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt install -y \
  git curl wget cmake make tzdata python3 python3-pip

# set timezone and locale
RUN  ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata && \
  locale-gen en_US.UTF-8 && \
  update-locale LANG=en_US.UTF-8

# nodejs
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  NODE_MAJOR=20 echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list && \
  sudo apt-get update -y && \
  sudo apt-get install nodejs -y
