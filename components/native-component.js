const nativeComponentTemplate = document.createElement('template')

nativeComponentTemplate.innerHTML = `
	<style>	
		*,
		*::before,
		*::after,
		:host,
		:host::before,
		:host::after {
			box-sizing: border-box;
			font-family: 'Roboto', sans-serif;
		}
		
		:host,
		:host::before,
		:host::after {
			display: block;
		}
	
		.hidden,
		:host([hidden]),
		:host(.hidden) {
			display: none !important;
		}
	</style>
`

class NativeComponent extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.append(nativeComponentTemplate.content.cloneNode(true))
		NativeComponent.formTemplate({ root: this.shadowRoot, template: this.css })
		NativeComponent.formTemplate({ root: this.shadowRoot, template: this.html })
	}

	static formTemplate({ root, template }) {
		if (template === undefined) return
		const templateElement = document.createElement('template')
		templateElement.innerHTML = template
		root.append(templateElement.content.cloneNode(true))
	}
}

window.NativeComponent = NativeComponent;
