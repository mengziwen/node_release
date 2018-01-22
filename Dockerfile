FROM registry.cn-hangzhou.aliyuncs.com/swtech/xenode
MAINTAINER Meng <mengziwen@zhiguaniot.com>
COPY bin /usr/app/bin
COPY node_modules /usr/app/node_modules
COPY public /usr/app/public
COPY routes /usr/app/routes
COPY views /usr/app/views
COPY app.js /usr/app/app.js
COPY package.json /usr/app/package.json
ENV PORT 3000
EXPOSE 3000
WORKDIR /usr/app/views
RUN npm install
ENTRYPOINT npm start
