const scanner = require("sonarqube-scanner");

// Execution: node sonarqube-scanner.js
scanner(
  {
    // Update with url from sonar
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.projectName": "twelve-kingdoms-ui",
      "sonar.sources": "./src",
      // Update with login and password from sonar
      "sonar.login": "admin",
      "sonar.password": "sonar",
      "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml",
    },
  },
  () => process.exit()
);
