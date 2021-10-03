FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

# RUN yarn build

# RUN rm -rf ./src ./.github ./.husky

EXPOSE 3335

# CMD ["yarn", "start"]
CMD ["yarn", "dev"]
