// README https://github.com/antfu/eslint-config

import antfu, { pluginTs, pluginVue } from '@antfu/eslint-config'
import pluginUno from '@unocss/eslint-plugin'

const config = antfu(
  {
    ignores: [],
  },
  pluginUno.configs.flat,
  {
    rules: {
      'curly': ['error', 'all'],
      'no-console': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'array-callback-return': 0,
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    },
  },
  {
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/quotes': ['error', 'single', { avoidEscape: true }], // 单引号，允许反义
    },
  },
  {
    plugins: {
      ts: pluginTs,
    },
    rules: {
      'ts/ban-types': [2, { types: { Function: false } }],
    },
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
    },
  },
  {
    plugins: {
      vue: pluginVue,
    },
    rules: {
      // 'vue/attribute-hyphenation': ['warn', 'never', { ignore: ['custom-prop'] }], // props attrs - disabled
      'vue/v-on-event-hyphenation': ['warn', 'never', { ignore: ['custom-event'] }], // v-on
    },
  },
  {
    rules: {
      'jsdoc/no-defaults': 'off',
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)

export default config
