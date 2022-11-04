module.exports = {
  root: true,
  ignorePatterns: [
    "projects/**/*"
  ],
  overrides: [
    {
      "files": [
        "*.js"
      ],
      parserOptions: {
        "ecmaVersion": "latest"
      },
      env: {
          "es6": true
      }
    },
    {
      "files": [
        "*.ts"
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          "tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case"
          }
        ],
        "@angular-eslint/no-empty-lifecycle-method": "off"
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    }
  ]
}
