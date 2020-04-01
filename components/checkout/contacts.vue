<template>
	<div class="checkout-contacts">
		<h3 class="section-title">Контактные данные</h3>
		<input type="text" placeholder="ФИО" class="checkout-page-input">
		<client-only>
            <the-mask :mask="['+7 (###) ###-##-##']" class="checkout-page-input" type="tel" placeholder="Номер телефона" required/>
        </client-only>
		<input type="mail" placeholder="E-mail" class="checkout-page-input">
	</div>
</template>