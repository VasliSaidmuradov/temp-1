<template>
	<div class="profile-history-table">
		<div class="profile-history-order">
			<div class="profile-history-row">
				<div class="profile-history-col">
					<p class="profile-page-text">№ 3432</p>
				</div>
				<div class="profile-history-col">
					<p class="profile-page-text">10.02.2020</p>
				</div>
				<div class="profile-history-col">
					<p class="profile-page-text">Оплачен</p>
				</div>
				<div class="profile-history-col">
					<button class="profile-history-details" @click="currentDropdownIndex = !currentDropdownIndex"></button>
					<button class="profile-history-remove"></button>
				</div>
			</div>
			<div v-if="currentDropdownIndex" class="profile-history-dropdown">
				<div class="profile-history-product">
					<div class="profile-history-col">
						<div class="profile-history-img">
							<img src="/images/product.png" alt="Skiny image">
						</div>
						<p class="profile-page-text">VALMONT deto2x limited edition</p>
					</div>
					<div class="profile-history-col --grow">
						<p class="profile-page-text">2 шт.</p>
					</div>
					<div class="profile-history-col">
						<p class="profile-page-text">1 590 ₸</p>
					</div>
				</div>
				<ul class="profile-history-list">
					<li class="profile-history-list-item">
						<p class="profile-page-text">Адрес доставки</p>
						<p class="profile-page-text">Алматы, Аль-Фараби 12, дом 1, кв. 22, 434500</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Доставка</p>
						<p class="profile-page-text">Курьером</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Способ оплаты</p>
						<p class="profile-page-text">Картой онлйн</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Общая стоимость</p>
						<p class="profile-page-text">1 590 ₸</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Стоимость доставки</p>
						<p class="profile-page-text">200 ₸</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Итого</p>
						<p class="profile-page-text">11 590 ₸</p>
					</li>
				</ul>
				<button class="button --black">Оплатить заказ</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentDropdownIndex: false
		}
	}
}
</script>