<template>
  <div class="product-info">
    <div class="product-info-rating"></div>
    <h3 class="product-info-title">Описание</h3>
    <p class="product-info-text" v-html="info.descripiton ? info.description : ''"></p>
    <h3 class="product-info-title">Доставка</h3>
    <div class="product-info-row">
      <img src="/icons/delivery-icon.svg" class="product-info-delivery-icon" alt="delivery icon" />
      <p class="product-info-delivery-text">
        Доставка курьером,
        <b v-if="tomorrow === now">завтра, {{ $formatDate(now) }},</b>
        <b v-else>сегодня, {{ $formatDate(now) }},</b>
        <span>Бесплатно</span>
      </p>
    </div>
    <div class="product-info-row">
      <img src="/icons/house-icon.svg" class="product-info-delivery-icon" alt="Skiny icon" />
      <p class="product-info-delivery-text">
        Самовывоз,
        <b v-if="tomorrow === now">завтра, {{ $formatDate(now) }},</b>
        <b v-else>сегодня, {{ $formatDate(now) }},</b>
      </p>
    </div>
    <nuxt-link class="product-page-link" to="/help/delivery">Подробнее про условия доставки</nuxt-link>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  props: {
    info: Object
	},
	computed: {
		tomorrow() {
			const msInADay = 60 * 60 * 24 * 1000
			const today = Date.now()
			return today + msInADay
    },
    today() {
      return Date.now()
    },
    now() {
      let hour = moment().hour()
      const fn = () => hour = moment().hour()
      setInterval(fn, 1000)
      if (hour >= 19 && hour <= 23) {
        return this.tomorrow
      }
      return this.today
    }
	}
};
</script>
