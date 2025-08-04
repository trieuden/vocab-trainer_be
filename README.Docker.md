# Vocab Trainer Backend

A NestJS backend application for vocabulary training.

## Docker Setup

### Prerequisites
- Docker and Docker Compose installed on your system

### Production Environment

1. **Build and run the application with database:**
   ```bash
   npm run docker:up
   ```

2. **View logs:**
   ```bash
   npm run docker:logs
   ```

3. **Stop the application:**
   ```bash
   npm run docker:down
   ```

### Development Environment

1. **Run development environment with hot reload:**
   ```bash
   npm run docker:dev
   ```

2. **Stop development environment:**
   ```bash
   npm run docker:dev:down
   ```

### Manual Docker Commands

1. **Build the image:**
   ```bash
   docker build -t vocab-trainer-be .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 vocab-trainer-be
   ```

### Environment Variables

The application uses the following environment variables:

- `DB_HOST`: Database host (default: postgres for Docker)
- `DB_PORT`: Database port (default: 5432)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Application port (default: 3000)

### Services

- **Application**: Runs on port 3000
- **PostgreSQL Database**: Runs on port 5432 (production) or 5433 (development)

### Health Checks

Both the application and database include health checks to ensure proper startup order and monitoring.

### Cleanup

To remove all containers, volumes, and images:
```bash
npm run docker:clean
```
