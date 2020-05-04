<template>
  <div class="product-info">
    <div class="product-info-rating"></div>
    <h3 class="product-info-title">Описание</h3>
    <p class="product-info-text">{{ info.description }}</p>
    <h3 class="product-info-title">Доставка</h3>
    <div class="product-info-row">
      <img src="/icons/delivery-icon.svg" class="product-info-delivery-icon" alt="Skiny icon" />
      <p class="product-info-delivery-text">
        Доставка курьером,
        <b>завтра, {{ $formatDate(tomorrow) }},</b>
        <span>Бесплатно</span>
      </p>
    </div>
    <div class="product-info-row">
      <img src="/icons/house-icon.svg" class="product-info-delivery-icon" alt="Skiny icon" />
      <p class="product-info-delivery-text">
        Пункты выдачи и постаматы,
        <b>завтра, {{ $formatDate(tomorrow) }},</b>
        <span>бесплатно</span>
      </p>
    </div>
    <nuxt-link class="product-page-link" to="/help/delivery">Подробнее про условия доставки</nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
	},
	computed: {
		tomorrow() {
			const msInDay = 60 * 60 * 24 * 1000
			const today = Date.now()
			return today + msInDay
		}
	}
};
</script>