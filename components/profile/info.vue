<template>
	<div class="profile-info-row">
		<div class="profile-info-col">
			<h5 class="profile-page-subtitle">Учётная запись</h5>
			<label class="profile-page-label">Почта</label>
			<div class="profile-page-input-wrp">
				<input disabled type="mail" class="profile-page-input" value="brandy.franklin@example.com">
				<button class="profile-page-edit">Изменить</button>
			</div>
			<label class="profile-page-label">Телефон</label>
			<div class="profile-page-input-wrp">
				<client-only>
		            <the-mask :mask="['+7 (###) ###-##-##']" class="profile-page-input" disabled type="tel" value="+77777777777" required/>
		        </client-only>
				<button class="profile-page-edit">Изменить</button>
			</div>
			<label class="profile-page-label">Пароль</label>
			<div class="profile-page-input-wrp">
				<input disabled type="password" class="profile-page-input" value="123456">
				<button class="profile-page-edit">Изменить</button>
			</div>
		</div>
		<div class="profile-info-col">
			<h5 class="profile-page-subtitle">Личные данные</h5>
			<div class="profile-page-input-wrp">
				<label class="profile-page-label">ФИО</label>
				<input type="text" class="profile-page-input" value="Robert Henry Robert" disabled>
			</div>
			<div class="profile-page-input-wrp">
				<label class="profile-page-label">Дата рождения</label>
				<input type="text" class="profile-page-input" value="12 декабря 1990" disabled>
			</div>
			<button class="profile-page-edit">Изменить личные данные</button>
		</div>
	</div>
</template>