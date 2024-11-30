# Step 1: Use a lightweight Node.js image
FROM node:16-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy all files and build the app
COPY . ./
RUN npm run build

# Step 5: Use Nginx to serve the built app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Step 6: Expose the port
EXPOSE 80

# Step 7: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
