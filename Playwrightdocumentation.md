# Playwright Test Automation Project

A simple end-to-end test automation framework built with Playwright for testing web applications.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [CI/CD Integration](#cicd-integration)
- [Docker Support](#docker-support)
- [Test Reports](#test-reports)
- [Contributing](#contributing)

## 🎯 Overview

This project demonstrates automated testing using Playwright Test framework. It includes sample tests for:
- Google homepage verification
- Bing search functionality

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/playwright1.git
   cd playwright1
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

## 📁 Project Structure

```
playwright1/
├── tests/
│   └── example.spec.js       # Sample test cases
├── playwright-report/         # HTML test reports
├── test-results/              # Test execution results
├── playwright.config.js       # Playwright configuration
├── package.json               # Node.js dependencies
└── README.md                  # Project documentation
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (with browser UI)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run specific test file
```bash
npx playwright test tests/example.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View last HTML report
```bash
npx playwright show-report
```

## ⚙️ Configuration

Create a `playwright.config.js` file in the root directory:

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 🔄 CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow that runs tests on every push and pull request.

**Workflow file**: `.github/workflows/playwright.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

### Azure DevOps

See `azure-pipelines.yml` for Azure DevOps pipeline configuration.

## 🐳 Docker Support

### Using Official Playwright Docker Image

```bash
docker run --rm -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.40.0-jammy npm ci
docker run --rm -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.40.0-jammy npx playwright test
```

### Custom Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

Build and run:

```bash
docker build -t playwright-tests .
docker run --rm playwright-tests
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.40.0-jammy
    volumes:
      - .:/app
    working_dir: /app
    command: sh -c "npm ci && npx playwright test"
```

Run with:

```bash
docker-compose up
```

## 📊 Test Reports

After running tests, view reports:

### HTML Report
```bash
npx playwright show-report
```

Reports are generated in:
- `playwright-report/` - HTML reports
- `test-results/` - JSON and trace files

## 🧑‍💻 Writing Tests

Example test structure:

```javascript
const { test, expect } = require('@playwright/test');

test('test description', async ({ page }) => {
  // Navigate to page
  await page.goto('https://example.com');
  
  // Interact with elements
  await page.click('button#submit');
  
  // Assert expectations
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## 🛠️ Debugging

### Debug with Playwright Inspector
```bash
npx playwright test --debug
```

### Generate trace files
```bash
npx playwright test --trace on
```

View traces:
```bash
npx playwright show-trace test-results/trace.zip
```

## 📝 Best Practices

- ✅ Use page object model for complex applications
- ✅ Keep tests independent and isolated
- ✅ Use proper waits (avoid fixed timeouts)
- ✅ Follow naming conventions for test files
- ✅ Add meaningful test descriptions
- ✅ Use auto-waiting features of Playwright
- ✅ Capture screenshots/videos on failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Community Discord](https://discord.com/invite/playwright-807756831384403968)

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Happy Testing! 🎭**
