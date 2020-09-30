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
				background-image: url('./img/avatar.jpg');
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
			
			@keyframes spin {
				100% {transform: rotate(360deg)}
			}

		</style>
	`}

	get html() { return `
		<header>
			<div class="avatar-overlay"></div>
			<div class="avatar"></div>
			<div class="nickname">Bloody Pudding</div>
		</header>
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