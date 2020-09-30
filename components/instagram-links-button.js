class InstagramLinksButton extends NativeComponent {
	get css() { return `
		<style>
			.instagram-links-button {
				cursor: pointer;
				margin-top: 5px;
				margin-bottom: 5px;
				border: 1px solid #333333;
				border-radius: 5px;
				width: 100%;
				padding: 0.3em;
				text-align: center;
			}
		</style>
	`}

	get html() { return `
		<div class="instagram-links-button"></div>
	`}

	constructor() {
		super()
	}

	connectedCallback() {
		const button = this.shadowRoot.querySelector('.instagram-links-button')
		button.innerText = this.name
		button.addEventListener('click', () => {
			window.open(this.link);
		})
	}
}

customElements.define('instagram-links-button', InstagramLinksButton)