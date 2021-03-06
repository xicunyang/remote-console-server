FROM centos:latest
LABEL Author="MUTOU"

RUN yum -y install nodejs

COPY index.js /node/remote-console-server/
COPY package.json /node/remote-console-server/
COPY pem/1_ws.yangxc.cn_bundle.crt /node/remote-console-server/pem/
COPY pem/2_ws.yangxc.cn.key /node/remote-console-server/pem/

RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npm.taobao.org/

RUN npm install -g yarn
# RUN npm install forever -g
# RUN yarn global add forever
RUN cd /node/remote-console-server/ && npm install

CMD ["node", "/node/remote-console-server/index.js"]

EXPOSE 9888
