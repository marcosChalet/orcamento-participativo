FROM node:18-bullseye
# Installing libvips-dev for sharp Compatibility
RUN apt-get update && apt-get install -y build-essential gcc autoconf automake zlib1g-dev libpng-dev nasm bash libvips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
WORKDIR /opt/
COPY ./ .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]
