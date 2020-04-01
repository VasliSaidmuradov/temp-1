<template>
	<div class="checkout-payment">
		<h3 class="section-title">Способы оплаты</h3>
		<label class="checkout-payment-radio">
			<input name="payment-type" checked type="radio">
			<span class="checkout-payment-checkmark"></span>
			<p class="checkout-payment-radio-title">Картой онлайн</p>
		</label>
		<label class="checkout-payment-radio">
			<input name="payment-type" type="radio">
			<span class="checkout-payment-checkmark"></span>
			<div>
				<p class="checkout-payment-radio-title">Наличными при получении</p>
				<p class="checkout-payment-radio-text">Оплата наличными курьеру при получении</p>
			</div>
		</label>
	</div>
</template>