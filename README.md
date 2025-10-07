# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Dockerization

This application includes a `Dockerfile` to make it easy to build and run a production-ready container.

### Build the image

To build the Docker image, run the following command from the root of the project:

```bash
docker build -t loadpilot .
```

### Run the container

Once the image is built, you can run it as a container with this command:

```bash
docker run -p 9002:3000 loadpilot
```

The application will be accessible at `http://localhost:9002`.
