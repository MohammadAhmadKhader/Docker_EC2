FROM node:20 as base


FROM base as development

WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN npm install
COPY . .
ENV PORT=4000
EXPOSE $PORT
CMD ["npm" , "run" , "dev"]

FROM base as production

WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN npm install --only=production
COPY . .
ENV PORT=4000
EXPOSE $PORT
CMD ["npm" , "start"]