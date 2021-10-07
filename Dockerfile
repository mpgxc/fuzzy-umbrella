FROM node:14

WORKDIR /usr/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma generate

# RUN yarn build

# RUN rm -rf ./src ./.github ./.husky

# CMD ["yarn", "start"]

EXPOSE ${API_PORT}



CMD ["yarn", "dev"]
