class InstagramLinksApp extends NativeComponent {
	get css() { return `
		<style>
			:host {
				width: 100%;
				max-width: 440px;
				/* Отступы по вертикали зависят от высоты окна: на ноутбуке всё влезает в экран,
				   на высоком мониторе остаётся воздух */
				padding: clamp(20px, 6vh, 56px) 20px clamp(16px, 3vh, 32px);
				display: flex;
				flex-direction: column;
				min-height: 100vh;
				min-height: 100dvh;
			}

			header {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: clamp(10px, 2vh, 16px);
				margin-bottom: clamp(18px, 3.5vh, 32px);
			}

			.avatar-ring {
				position: relative;
				width: clamp(88px, 13vh, 108px);
				height: clamp(88px, 13vh, 108px);
				border-radius: 50%;
				display: grid;
				place-items: center;
			}

			/* Вращается только кольцо, фото стоит на месте */
			.avatar-ring::before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: 50%;
				background: conic-gradient(var(--accent-a), var(--accent-b), var(--accent-a));
				animation: spin 4s linear infinite;
			}

			.avatar {
				position: relative;
				width: calc(100% - 10px);
				height: calc(100% - 10px);
				border-radius: 50%;
				border: 3px solid var(--bg);
				background-color: var(--chip);
				background-position: center;
				background-size: cover;
			}

			h1 {
				margin: 0;
				font-size: 28px;
				font-weight: 800;
				letter-spacing: -0.02em;
			}

			.name {
				text-align: center;
			}

			.bio {
				margin: 6px 0 0;
				font-size: 15px;
				line-height: 1.4;
				color: var(--muted);
			}

			.cards {
				display: flex;
				flex-direction: column;
				gap: clamp(8px, 1.4vh, 12px);
			}

			.icons {
				display: flex;
				justify-content: center;
				gap: 12px;
				margin-top: clamp(14px, 3vh, 24px);
			}

			.press {
				margin-top: auto;
				padding-top: clamp(20px, 5vh, 56px);
				text-align: center;
			}

			.press h2 {
				margin: 0 0 4px;
				font-size: 11px;
				font-weight: 600;
				letter-spacing: .12em;
				text-transform: uppercase;
				color: var(--muted);
				opacity: .7;
			}

			.press .list {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				column-gap: 18px;
			}

			@keyframes spin {
				to { transform: rotate(360deg) }
			}

			@media (prefers-reduced-motion: reduce) {
				.avatar-ring::before { animation: none; }
			}
		</style>
	`}

	constructor() {
		super()
	}

	connectedCallback() {
		fetch('config.json')
			.then(response => response.json())
			.then(result => {
				this.renderHeader(result.heading)
				this.renderGroups(result.groups)
			})

		this.changeTitle()
	}

	renderHeader({ nickname, avatar, bio }) {
		const header = document.createElement('header')

		const ring = document.createElement('div')
		ring.className = 'avatar-ring'

		const image = document.createElement('div')
		image.className = 'avatar'
		image.setAttribute('role', 'img')
		image.setAttribute('aria-label', nickname)
		image.style.backgroundImage = `url(${avatar})`
		ring.append(image)

		const title = document.createElement('h1')
		title.textContent = nickname

		const name = document.createElement('div')
		name.className = 'name'
		name.append(title)
		if (bio) {
			const text = document.createElement('p')
			text.className = 'bio'
			text.textContent = bio
			name.append(text)
		}

		header.append(ring, name)
		this.shadowRoot.append(header)
	}

	renderGroups(groups) {
		const variants = { cards: 'card', icons: 'icon', press: 'press' }

		const sections = groups.map(group => {
			const style = group.style in variants ? group.style : 'cards'
			const section = document.createElement(style === 'press' ? 'footer' : 'section')
			section.className = style

			if (group.title) {
				const title = document.createElement('h2')
				title.textContent = group.title
				section.append(title)
			}

			const buttons = group.buttons.map(btn => this.createButton(btn, variants[style]))
			if (style === 'press') {
				const list = document.createElement('div')
				list.className = 'list'
				list.append(...buttons)
				section.append(list)
			} else {
				section.append(...buttons)
			}
			return section
		})
		this.shadowRoot.append(...sections)
	}

	createButton(btn, variant) {
		const button = document.createElement('instagram-links-button')
		Object.assign(button, { variant, name: btn.name, note: btn.note, icon: btn.icon, link: btn.link })
		return button
	}

	changeTitle() {
		const title = document.title

		window.addEventListener('blur', () => {
			document.title = 'Вернись...'
		})

		window.addEventListener('focus', () => {
			document.title = title
		})
	}
}

customElements.define('instagram-links-app', InstagramLinksApp)
