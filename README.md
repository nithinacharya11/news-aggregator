Running the Project in Docker
Follow these steps to run the project inside a Docker container.
Prerequisites
Make sure you have Docker installed. You can download it from https://www.docker.com/get-started. Ensure that Docker is running on your machine.
Steps to Run the Project in Docker
1. Clone the Repository
   Clone the repository to your local machine if you haven't already:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Build the Docker Image
   In the root folder of the project, run the following command to build the Docker image:

   ```bash
   docker build -t nextjs-app .
   ```
   This command will:
   - Create a Docker image tagged as nextjs-app.
   - Install all dependencies and build the Next.js app.

3. Run the Docker Container
   After the image is built successfully, you can run the project inside a Docker container using this command:

   ```bash
   docker run -p 3000:3000 nextjs-app
   ```
   This will:
   - Run the container.
   - Expose port 3000 from the container to your host machine's port 3000.

4. Access the Application
   Open your browser and go to http://localhost:3000 to access the Next.js application running in Docker.

5. Stop the Docker Container
   To stop the Docker container, press Ctrl + C or run the following command in your terminal to stop all running containers:

   ```bash
   docker stop <container-id>
   ```
   To list all running containers, use:

   ```bash
   docker ps
   ```
   Replace <container-id> with the actual ID or name of your running container.

