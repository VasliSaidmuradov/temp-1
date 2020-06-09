<template>
	<div class="contacts-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="">Контакты</nuxt-link>
			</div>
			<div class="contacts-page-top">
			</div>
			<div class="contacts-page-bot">
				<div class="contacts-page-list">
          <div class="contacts-page-phone">
            <a href="tel:87772623060">8 (777) 262-30-60</a>
          </div>
          <div class="contacts-page-schedule">
            <p>Часы работы:</p>
            <p>Пн - Чт 10:00 — 18:00,</p>
            <p>Пт 10:00 — 15:30</p>
          </div>
					<div class="contacts-page-list-item">
						<p class="contacts-page-address">Жибек-Жолы проспект, 81</p>
						<p class="contacts-page-list-phone"><a href="tel:87772623060">8 (777) 262-30-60</a></p>
					</div>
				</div>
				<div class="contacts-page-right">
					<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ace3fab0ca49de2ae0671cd03bb9bdb7046993c0a8a9483abfb108ca2ff65c0e9&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
				</div>
			</div>
      <div class="contacts-page-info">
        <div class="contacts-page-info-item">
          <div class="contacts-page-info-default">
            <IconTruck class="contacts-page-info-icon" />
            <span>Поставщикам продукции</span>
          </div>
          <div class="contacts-page-info-onhover">
            <IconPhone />
            <span>8 (727) 396-18-34</span>
          </div>
        </div>
        <div class="contacts-page-info-item">
          <div class="contacts-page-info-default">
            <IconHandshake class="contacts-page-info-icon" />
            <span>Сотрудничество</span>
          </div>
        </div>
        <div class="contacts-page-info-item">
          <div class="contacts-page-info-default">
            <IconUserProfile class="contacts-page-info-icon" />
            <span>Хочу здесь работать</span>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>
<script>
import IconTruck from '@/static/icons/truck.svg'
import IconHandshake from '@/static/icons/handshake.svg'
import IconUserProfile from '@/static/icons/user-profile.svg'
import IconPhone from '@/static/icons/phone-icon.svg'

export default {
  components: {
    IconTruck,
    IconHandshake,
    IconUserProfile,
    IconPhone,
  }
}
</script>
