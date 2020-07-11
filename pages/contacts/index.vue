<template>
	<div class="contacts-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="">Контакты</nuxt-link>
			</div>
			<h1 class="contacts-page-title">Контакты</h1>
			<div class="contacts-page-top">
				<div class="contacts-page-info">
					<div class="contacts-page-phone">
						<a href="tel:87756444441">8 (775) 644-44-41</a>
					</div>
					<div class="contacts-page-schedule">
						<p>Режим работы магазина:</p>
					</div>
					<ul class="contacts-page-list">
						<li class="contacts-page-list-item">
							<p class="contacts-page-address">Жибек-Жолы проспект, 81</p>
							<p class="contacts-page-list-phone"><a href="tel:87756444441">8 (775) 644-44-41</a></p>
						</li>
					</ul>
					<div class="contacts-page-schedule">
						<p>Ежедневно с 10:00 — 22:00</p>
						<p>Консультация интернет-магазина с 10:00 — 00:00</p>
					</div>
				</div>
				<div class="contacts-page-right">
					<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ace3fab0ca49de2ae0671cd03bb9bdb7046993c0a8a9483abfb108ca2ff65c0e9&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
				</div>
			</div>
			<div class="contacts-page-row">
				<div class="contacts-page-col">
					<div class="contacts-page-col-front">
						<img src="/icons/contacts-icon1.svg" alt="Skiny icon" class="contacts-page-front-icon">
						<p class="contacts-page-col-text">Поставщикам продукции</p>
					</div>
					<div class="contacts-page-col-back">
						<div>
							<p class="contacts-page-col-text">
								<phone-icon />
								<a href="tel:87079222217">8 (707) 922-22-17</a>
							</p>
							<p class="contacts-page-col-text">
								<email-icon />
								<a href="mailto:arman@brandstudio.kz">arman@brandstudio.kz</a>
							</p>
						</div>
					</div>
				</div>
				<div class="contacts-page-col">
					<div class="contacts-page-col-front">
						<img src="/icons/contacts-icon2.svg" alt="Skiny icon" class="contacts-page-front-icon">
						<p class="contacts-page-col-text">Сотрудничество</p>
					</div>
					<div class="contacts-page-col-back">
						<div>
							<p class="contacts-page-col-text">
								<phone-icon />
								<a href="tel:87018429093">8 (701) 842-90-93</a>
							</p>
							<!-- <p class="contacts-page-col-text">
								<email-icon />
								<a href="">email@mail.com</a>
							</p> -->
						</div>
					</div>
				</div>
				<div class="contacts-page-col">
					<div class="contacts-page-col-front">
						<img src="/icons/contacts-icon3.svg" alt="Skiny icon" class="contacts-page-front-icon">
						<p class="contacts-page-col-text">Хочу здесь работать</p>
					</div>
					<div class="contacts-page-col-back">
						<div>
							<p class="contacts-page-col-text">
								<phone-icon />
								<a href="">8 (708) 618-62-23</a>
							</p>
							<p class="contacts-page-col-text">
								<email-icon />
								<a href="mailto:nazym@brandstudio.kz">nazym@brandstudio.kz</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import phoneIcon from '@/static/icons/phone-icon-base.svg'
import emailIcon from '@/static/icons/email-icon-base.svg'
export default {
	components: {
		phoneIcon,
		emailIcon
	}
}
</script>
