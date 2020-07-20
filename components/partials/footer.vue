<template>
	<footer class="footer">
		<div class="container">
			<div class="row">
				<div class="footer-col">
					<p class="footer-copyright">2020 © Skiny.kz интернет-магазин</p>
					<img src="/images/cards.png" alt="Skiny image">
				</div>
				<div class="footer-col">
					<h6 class="footer-heading">Компания</h6>
					<div><nuxt-link to="/help/about" class="footer-link">О компании</nuxt-link></div>
					<div><nuxt-link to="/news" class="footer-link">Новости</nuxt-link></div>
					<div><nuxt-link to="/contacts" class="footer-link">Магазины</nuxt-link></div>
				</div>
				<div class="footer-col">
					<h6 class="footer-heading">ПОМОЩЬ</h6>
					<div><nuxt-link to="/help/payment" class="footer-link">Оплата</nuxt-link></div>
					<div><nuxt-link to="/help/delivery" class="footer-link">Доставка</nuxt-link></div>
					<div><nuxt-link to="/help/how-to-order" class="footer-link">Как сделать заказ</nuxt-link></div>
					<div><nuxt-link to="/help/bonuses" class="footer-link">Бонусы</nuxt-link></div>
				</div>
				<div class="footer-col">
					<h6 class="footer-heading">ИНФОРМАЦИЯ</h6>
					<!-- <nuxt-link :to="brands[0] ? '/brands/${brands[0].slug}' : ''" class="footer-link">Бренды</nuxt-link> -->
					<div><nuxt-link to="/sales" class="footer-link">Акции</nuxt-link></div>
				</div>
				<div class="footer-col">
					<div class="footer-phone-wrp">
						<a href="tel:87756444441" class="footer-phone">8 (775) 644-44-41</a>
					</div>
				</div>
			</div>
			<div class="row --justify-start">
				<a href="/files/Политика_конфиденциальности_персональных_данных.docx" target="_blank"><p class="footer-copyright">Политика конфиденциальности</p></a>
				<a href="/files/offerta_skiny.docx" target="_blank"><p class="footer-copyright">Оферта</p></a>
			</div>
		</div>
	</footer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['brands'],
  computed: {
    ...mapGetters({
      brands: 'brand/GET_BRANDS'
    })
  }
}
</script>

<style>

</style>
