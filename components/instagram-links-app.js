import('./instagram-links-button.js')

class InstagramLinksApp extends NativeComponent {
	get css() { return `
		<style>
			:host {
				padding: 10px;
				width: 100%;
				max-width: 935px;
			}
			
			h1 {
				font-size: 2em;
			}
			
			header {
				margin: 0.8em 0;
				display: flex;
				align-items: center;
				position: relative;
			}
			
			.avatar-overlay {
				width: 74px;
				height: 74px;
				border-radius: 50%;
				background: linear-gradient(rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
				animation: spin 2s linear infinite;
				transform-origin: 50% 50%;
				min-width: 74px;
			}
			
			.avatar {
			    position: absolute;
			    left: 37px;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 70px;
				height: 70px;
				border-radius: 50%;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				z-index: 999;
			}
			
			.nickname {
				font-size: 2.5em;
				font-weight: 100;
				margin-left: 20px;
			}
			
			.small-buttons {
				display: grid;
				grid-column-gap: 10px;
			}
			
			@keyframes spin {
				100% {transform: rotate(360deg)}
			}

		</style>
	`}

	get html() { return `

	`}

	constructor() {
		super()
	}

	connectedCallback() {
		fetch('config.json')
			.then(response => response.json())
			.then(result => {
				this.renderHeader(result.heading)
				this.renderElements(result.groups)
			})

		this.changeTitle()
	}

	renderHeader({nickname, avatar}) {
		const header = document.createElement('header')

		const overlay = document.createElement('div')
		overlay.classList.add('avatar-overlay')

		const image = document.createElement('div')
		image.classList.add('avatar')
		image.style.backgroundImage = `url(${avatar})`

		const text = document.createElement('div')
		text.classList.add('nickname')
		text.innerText = nickname

		header.append(overlay, image, text)
		this.shadowRoot.append(header)
	}

	renderElements(groups) {
		const elements = groups.map(group => {
			const section = document.createElement('section')

			const title = document.createElement('h1')
			title.innerText = group.title

			const buttons = group.buttons.map(btn => this.createButton(btn))

			const buttonWrapper = document.createElement('div')
			if (group.small) {
				buttonWrapper.classList.add('small-buttons')
				buttonWrapper.style.gridTemplateColumns = `repeat(${buttons.length}, 1fr)`
			}

			buttonWrapper.append(...buttons)
			section.append(title, buttonWrapper)
			return section
		})
		this.shadowRoot.append(...elements)
	}

	createButton(btn) {
		const button = document.createElement('instagram-links-button')
		button.name = btn.name
		button.link = btn.link
		return button
	}

	changeTitle() {
		const title = document.querySelector('title');

		window.onblur = () => {
			title.innerText = 'Вернись...';
		};

		window.onfocus = () => {
			title.innerText = 'InstaLinks';
		};
	};
}

customElements.define('instagram-links-app', InstagramLinksApp)