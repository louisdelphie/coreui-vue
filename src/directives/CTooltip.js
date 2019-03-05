import Tooltip from 'tooltip.js'
export default {
  name: 'c-tooltip',
  inserted (el, binding) {
    binding.def._tooltip = new Tooltip(el, binding.def.getTooltipConfig(binding))
    if (binding.value.active)
      binding.def._tooltip.show()
  },
  unbind (el, binding) {
    let tooltip = binding.def._tooltip
    if (tooltip) {
      tooltip.dispose()
      tooltip = null
    }
  },
  getTooltipConfig (binding) {
    const props = binding.value
    const title = props.content || props
    const modifiersTriggers = String(Object.keys(binding.modifiers)).replace(',',' ')
    const closeOnClickOutside = props.closeOnClickOutside === false ? false : true
    return {
      title,
      trigger: modifiersTriggers || props.trigger || 'hover',
      html: true,
      placement: props.placement || 'top',
      delay: props.delay || 0,
      offset: props.offset || 0,
      arrowSelector: '.arrow',
      innerSelector: '.tooltip-inner',
      template: binding.def.getTemplate(),
      boundariesElement: document.getElementById(props.boundaries) || props.boundaries,
      container: props.appendToBody ? document.body : false,
      closeOnClickOutside,
      popperOptions: props.popperOptions
    }
  },
  getTemplate (title) {
    return `<div class="tooltip bs-tooltip-auto fade show" role="tooltip">
              <div class="arrow"></div>
              <div class="tooltip-inner"></div>
            </div>`
  }
}
