// Ссылка в одном из трёх видов: card — крупная карточка с иконкой и подписью,
// icon — круглая кнопка с одной иконкой, press — неприметная текстовая ссылка внизу.
class LinksButton extends NativeComponent {
	get css() { return `
		<style>
			a {
				color: inherit;
				text-decoration: none;
				-webkit-tap-highlight-color: transparent;
			}

			a:focus-visible {
				outline: 2px solid var(--accent-a);
				outline-offset: 3px;
			}

			.icon {
				display: block;
				width: 22px;
				height: 22px;
				background: currentColor;
				-webkit-mask: var(--icon) center / contain no-repeat;
				mask: var(--icon) center / contain no-repeat;
			}

			/* Карточка */
			.card {
				display: flex;
				align-items: center;
				gap: 14px;
				padding: 12px 16px 12px 12px;
				border-radius: 18px;
				border: 1.5px solid var(--line);
				background: var(--card);
				box-shadow: var(--shadow);
				transition: transform .15s ease, border-color .15s ease;
			}

			.card:hover {
				transform: translateY(-2px);
				border-color: transparent;
				background:
					linear-gradient(var(--card), var(--card)) padding-box,
					linear-gradient(135deg, var(--accent-a), var(--accent-b)) border-box;
			}

			.card:active {
				transform: translateY(0);
			}

			.card .badge {
				display: grid;
				place-items: center;
				flex: none;
				width: 44px;
				height: 44px;
				border-radius: 12px;
				background: var(--chip);
			}

			.card .text {
				display: flex;
				flex-direction: column;
				min-width: 0;
				flex: 1;
			}

			.card .name {
				font-weight: 600;
				font-size: 16px;
			}

			.card .note {
				font-size: 13px;
				color: var(--muted);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.card .arrow {
				color: var(--muted);
				font-size: 18px;
				transition: transform .15s ease, color .15s ease;
			}

			.card:hover .arrow {
				color: var(--text);
				transform: translate(2px, -2px);
			}

			/* Круглая кнопка-иконка */
			.round {
				display: grid;
				place-items: center;
				width: 48px;
				height: 48px;
				border-radius: 50%;
				border: 1.5px solid var(--line);
				background: var(--card);
				color: var(--muted);
				transition: transform .15s ease, color .15s ease, border-color .15s ease;
			}

			.round:hover {
				transform: translateY(-2px);
				color: var(--text);
				border-color: transparent;
				background:
					linear-gradient(var(--card), var(--card)) padding-box,
					linear-gradient(135deg, var(--accent-a), var(--accent-b)) border-box;
			}

			/* Текстовая ссылка */
			.press {
				display: inline-block;
				padding: 4px 0;
				font-size: 14px;
				color: var(--muted);
				transition: color .15s ease;
			}

			.press:hover {
				color: var(--text);
			}

			@media (prefers-reduced-motion: reduce) {
				.card, .round, .card .arrow { transition: none; }
				.card:hover, .round:hover, .card:hover .arrow { transform: none; }
			}
		</style>
	`}

	constructor() {
		super()
	}

	connectedCallback() {
		if (this.shadowRoot.querySelector('a')) return

		const link = document.createElement('a')
		link.href = this.link
		link.target = '_blank'
		link.rel = 'noopener noreferrer'

		const icon = () => {
			const element = document.createElement('span')
			element.className = 'icon'
			element.setAttribute('aria-hidden', 'true')
			element.style.setProperty('--icon', `url(img/icons/${this.icon}.svg)`)
			return element
		}

		if (this.variant === 'card') {
			link.className = 'card'

			const badge = document.createElement('span')
			badge.className = 'badge'
			if (this.icon) badge.append(icon())

			const text = document.createElement('span')
			text.className = 'text'
			const name = document.createElement('span')
			name.className = 'name'
			name.textContent = this.name
			text.append(name)
			if (this.note) {
				const note = document.createElement('span')
				note.className = 'note'
				note.textContent = this.note
				text.append(note)
			}

			const arrow = document.createElement('span')
			arrow.className = 'arrow'
			arrow.setAttribute('aria-hidden', 'true')
			arrow.textContent = '↗'

			link.append(badge, text, arrow)
		} else if (this.variant === 'icon') {
			link.className = 'round'
			link.setAttribute('aria-label', this.name)
			link.title = this.name
			link.append(icon())
		} else {
			link.className = 'press'
			link.textContent = `${this.name} ↗`
		}

		this.shadowRoot.append(link)
	}
}

customElements.define('links-button', LinksButton)
