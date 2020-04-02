<template>
	<div class="contacts-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="">Контакты</nuxt-link>
			</div>
			<div class="contacts-page-top">
				<div class="contacts-page-title-wrp">
					<p class="contacts-page-title">Магазины в городе</p> 
					<select class="contacts-page-select">
						<option value="">Алматы</option>
						<option value="">Нур-Султан</option>
					</select>
				</div>
				<div class="contacts-page-phone">
					<a href="">8 (727) 396-18-34</a>
				</div>
				<div class="contacts-page-schedule">
					<p>Часы работы:</p>
					<p>Пн - Чт 10:00 — 18:00,</p>
					<p>Пт 10:00 — 15:30</p>
				</div>
			</div>
			<div class="contacts-page-bot">
				<ul class="contacts-page-list">
					<li class="contacts-page-list-item">
						<p class="contacts-page-address">ул. Розыбакиева, 281</p>
						<p class="contacts-page-list-phone">8 (727) 396-18-34</p>
					</li>
					<li class="contacts-page-list-item">
						<p class="contacts-page-address">ул. Розыбакиева, 281</p>
						<p class="contacts-page-list-phone">8 (727) 396-18-34</p>
					</li>
				</ul>
				<div class="contacts-page-right">
					<img src="/icons/map.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>