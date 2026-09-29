# ============================================================
# Cypress E2E Testing Dockerfile
# ============================================================
# Official Cypress browsers image with Chrome, Firefox, Edge & Node 20
FROM cypress/browsers:node-20.14.0-chrome-126.0.6478.114-1-ff-127.0.1-edge-126.0.2592.61-1

# Set the working directory inside the container
WORKDIR /e2e

# Set environment variables for CI/Docker runtime
ENV CI=1 \
    CYPRESS_CACHE_FOLDER=/root/.cache/Cypress \
    TERM=xterm

# Copy package dependency manifests
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm ci || npm install

# Verify Cypress installation
RUN npx cypress verify

# Copy Cypress configuration and test suites
COPY cypress.config.js ./
COPY cypress ./cypress

# Default command to run Cypress in headless mode
CMD ["npm", "run", "cy:run:headless"]
