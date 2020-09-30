import('./instagram-links-button.js')

class InstagramLinksApp extends NativeComponent {
	get css() { return `
		<style>
			:host {
				padding: 10px;
			}
			h1 {
				font-size: 2em;
			}
		</style>
	`}

	get html() { return `
		
	`}

	constructor() {
		super()
		this.links = [
			{
				title: 'СМИ',
				buttons: [
					{
						name: 'Интервью для GeekBrains 🧠',
						link: 'https://geekbrains.ru/posts/prodavat-telefony-ehto-ne-moyo'
					},
					{
						name: 'Интервью для Knife 🔪',
						link: 'https://knife.media/feature/search-yourself/'
					}
				]
			},
			{
				title: 'Проекты',
				buttons: [
					{
						name: 'Генератор паролей 🎰',
						link: 'http://password.vladislavershov.com'
					}
				]
			}
		]
	}

	connectedCallback() {
		const elements = this.links.map(group => {
			const section = document.createElement('section')
			const title = document.createElement('h1')
			title.innerText = group.title
			const buttons = group.buttons.map(btn => {
				const button = document.createElement('instagram-links-button')
				button.name = btn.name
				button.link = btn.link
				return button
			})
			section.append(title, ...buttons)
			return section
		})
		this.shadowRoot.append(...elements)

		this.changeTitle()
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