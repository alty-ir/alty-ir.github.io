---
title: Getting Started with Docker
date: 2025-11-04
author: Ali TabeshPour
tags: docker, devops, containerization
---

# Getting Started with Docker

Docker has revolutionized the way we develop, ship, and run applications. In this post, I'll walk you through the basics of Docker and how to get started.

## What is Docker?

Docker is a platform that enables developers to package applications into containers—standardized executable components combining application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.

## Why Use Docker?

1. **Consistency**: Docker ensures your application works the same way in development, testing, and production
2. **Isolation**: Each container runs in isolation, preventing conflicts between applications
3. **Portability**: Containers can run on any system that supports Docker
4. **Efficiency**: Containers share the host OS kernel, making them lighter than virtual machines

## Installing Docker

### On macOS
```bash
# Download Docker Desktop from docker.com
# Or use Homebrew:
brew install --cask docker
```

### On Linux
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Start Docker
sudo systemctl start docker
```

## Your First Docker Container

Let's run a simple container:

```bash
docker run hello-world
```

This command downloads a test image and runs it in a container. When the container runs, it prints a message and exits.

## Basic Docker Commands

Here are some essential Docker commands:

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List images
docker images

# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# Remove an image
docker rmi <image-id>
```

## Creating a Dockerfile

A Dockerfile is a text file that contains instructions for building a Docker image. Here's a simple example for a Node.js application:

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
```

## Building and Running Your Image

```bash
# Build the image
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

## Docker Compose

For multi-container applications, Docker Compose is incredibly useful:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=example
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Run with:
```bash
docker-compose up
```

## Best Practices

1. **Use official base images** when possible
2. **Keep images small** by using alpine variants
3. **Use .dockerignore** to exclude unnecessary files
4. **Don't run containers as root** when possible
5. **Use multi-stage builds** to reduce final image size
6. **Pin versions** of base images for reproducibility

## Conclusion

Docker is an essential tool in modern development workflows. It simplifies deployment, ensures consistency across environments, and makes it easier to manage dependencies. Start small, experiment with containers, and gradually incorporate Docker into your development process.

Happy containerizing! 🐳
