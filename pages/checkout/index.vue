<template>
	<div class="checkout-page">
		<modal />
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/cart">Корзина / </nuxt-link>
				<nuxt-link to="">Оформление заказа</nuxt-link>
			</div>
			<div class="checkout-page-row">
        <!-- prod: {{ products }} -->
				<div class="checkout-page-col">
					<contacts />
					<getting />
					<payment />
					<extra />
				</div>
				<div class="checkout-page-col">
					<checkout-aside />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import modal from '@/components/checkout/modal'
import checkoutAside from '@/components/checkout/aside'
import contacts from '@/components/checkout/contacts'
import getting from '@/components/checkout/getting'
import payment from '@/components/checkout/payment'
import extra from '@/components/checkout/extra'

export default {
	components: {
		modal,
		contacts,
		checkoutAside,
		getting,
		payment,
		extra
  },
  middleware: ['cart'],
}
</script>
