import linter from '@antfu/eslint-config'
import xiodone from '@xiodone/eslint-config'

const config = linter(
  ...xiodone(),
  {
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
      }],
    },
  },
)

export default config
