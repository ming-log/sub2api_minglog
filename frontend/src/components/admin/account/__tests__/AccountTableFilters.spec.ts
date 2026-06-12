import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountTableFilters from '../AccountTableFilters.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

describe('AccountTableFilters', () => {
  it('renders account plan type options from server-provided values and emits the filter value', async () => {
    const wrapper = mount(AccountTableFilters, {
      props: {
        searchQuery: '',
        filters: {
          platform: 'openai',
          type: '',
          account_plan_type: '',
          status: '',
          privacy_mode: '',
          group: ''
        },
        groups: [],
        accountPlanTypes: ['Plus', 'Free', 'Plus']
      },
      global: {
        stubs: {
          SearchInput: {
            props: ['modelValue'],
            template: '<input />'
          },
          Select: {
            props: ['modelValue', 'options'],
            emits: ['update:modelValue', 'change'],
            methods: {
              onChange(event: Event) {
                this.$emit('update:modelValue', (event.target as HTMLSelectElement).value)
                this.$emit('change')
              }
            },
            template: '<select @change="onChange"><option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option></select>'
          }
        }
      }
    })

    const selects = wrapper.findAll('select')
    const planSelect = selects[2]
    const optionTexts = planSelect.findAll('option').map(option => option.text())

    expect(optionTexts).toEqual([
      'admin.accounts.allAccountPlanTypes',
      'Free',
      'Plus'
    ])

    await planSelect.setValue('Plus')

    expect(wrapper.emitted('update:filters')?.at(-1)?.[0]).toMatchObject({
      platform: 'openai',
      account_plan_type: 'Plus'
    })
  })
})
