#useful commands
#step one:  docker build -t <nameTagOfYourChoice> 
#step two:  docker run chosenNametag -p <choose a port such as 8080> 
#ste three:  docker run nametag


FROM node:latest

#create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm build

CMD ["npm", "start" ]