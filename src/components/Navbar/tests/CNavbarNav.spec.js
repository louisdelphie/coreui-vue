import { mount } from '@vue/test-utils'
import Component from '../CNavbarNav'

const ComponentName = 'CNavbar'
const defaultWrapper = mount(Component)
const customWrapper = mount(Component, {
  propsData: {
    fill: true,
    justified: true,
    pills: true,
    vertical: true
  },
  slots: {
    default: 'CNavbar items'
  }
})

describe(ComponentName, () => {
  it('has a name', () => {
    expect(Component.name).toMatch(ComponentName)
  })
  it('renders correctly', () => {
    expect(defaultWrapper.element).toMatchSnapshot()
  })
  it('renders correctly', () => {
    expect(customWrapper.element).toMatchSnapshot()
  })
})
