import Tooltip from 'tooltip.js'

export default {
  name: 'c-popover',
  tooltip: null,
  inserted (el, binding, vnode) {
    const tooltip = new Tooltip(el, binding.def.getTooltipConfig(binding))
    binding.def._tooltip = tooltip
    if (binding.value.active)
      tooltip.show()
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
    const title = props.content || 'content'
    const modifiersTriggers = String(Object.keys(binding.modifiers)).replace(',',' ')
    const closeOnClickOutside = props.closeOnClickOutside === false ? false : true
    const html = props.html === false ? false : true
    return {
      title,
      trigger: modifiersTriggers || props.trigger || 'hover',
      html,
      placement: props.placement || 'right',
      delay: props.delay || 0,
      offset: props.offset || 0,
      arrowSelector: '.arrow',
      innerSelector: '.popover-body',//passed by extension
      template: binding.def.getTemplate(props.header),//passed by extension
      boundariesElement: document.getElementById(props.boundaries) || props.boundaries,
      container: props.appendToBody ? document.body : false,
      closeOnClickOutside,
      popperOptions: props.popperOptions
    }
  },
  getTemplate (header) {
    return `<div class="popover bs-popover-auto fade show" role="tooltip">
              <div class="arrow"></div>
              <h3 class="popover-header">${header || 'header'}</h3>
              <div class="popover-body"></div>
            </div>`
  }
}
