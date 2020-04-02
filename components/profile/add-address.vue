<template>
	<div class="profile-add-address">
		<p class="profile-page-subtitle">Новый адрес</p>
		<select class="profile-page-select">
			<option value="" disabled selected>Город</option>
			<option value="">Алматы</option>
			<option value="">Астана</option>
		</select>
		<input type="text" placeholder="Улица" class="profile-page-input">
		<div class="profile-page-input-wrp">
			<input type="text" placeholder="Дом" class="profile-page-input">
			<input type="text" placeholder="Квартира / офис" class="profile-page-input">
			<input type="text" placeholder="Индекс" class="profile-page-input">
		</div>
		<button class="button --black">Сохранить</button>
	</div>
</template>