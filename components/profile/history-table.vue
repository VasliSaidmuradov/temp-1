<template>
	<div class="profile-history-table">
	<div class="profile-history-order" v-for="(order, index) in $getUser().orders" :key="index">
			<div class="profile-history-row">
				<div class="profile-history-col">
					<p class="profile-page-text">№ {{ order.id }}</p>
				</div>
				<div class="profile-history-col">
					<p class="profile-page-text">{{ $formatDate(order.created_at) }}</p>
				</div>
				<div class="profile-history-col">
					<p class="profile-page-text">{{ statuses[order.status] }}</p>
				</div>
				<div class="profile-history-col">
					<button class="profile-history-details" @click="toggleDropdown(index)"></button>
					<button class="profile-history-remove" v-if="order.status < 4" @click="removeOrder(index)" ></button>
				</div>
			</div>
			<div v-if="isDropdownOpen[index]" class="profile-history-dropdown">
				<div v-for="item in order.items" :key="item.id"  class="profile-history-product">
					<div class="profile-history-col">
						<div class="profile-history-img">
							<img :src="item.product.image" :alt="item.product.name">
						</div>
						<p class="profile-page-text">{{ item.product.name }}</p>
					</div>
					<div class="profile-history-col --grow">
						<p class="profile-page-text">
              {{ item.quantity }} 
              {{ item.product.tag ? item.product.tag.unit : 'шт' }}</p>
					</div>
					<div class="profile-history-col">
						<p class="profile-page-text">{{ $formatMoney(item.quantity * item.product.price) }} ₸</p>
					</div>
				</div>
				<ul class="profile-history-list">
					<li class="profile-history-list-item">
						<p class="profile-page-text">Адрес доставки</p>
						<p class="profile-page-text">Алматы,
              <span v-if="order.street">, {{ order.street }}</span>
							<span v-if="order.house">, дом {{ order.house }}</span>
							<span v-if="order.flat">, кв. {{ order.flat }}</span>
							<span v-if="order.index">, {{ order.index }}</span></p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Доставка</p>
						<p class="profile-page-text">{{ delivery_types[order.delivery_type] }}</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Способ оплаты</p>
						<p class="profile-page-text">{ payment_types[order.payment_type] }}</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Общая стоимость</p>
						<p class="profile-page-text">{{ $formatMoney(order.total - order.delivery_cost) }} ₸</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Стоимость доставки</p>
						<p class="profile-page-text">{{ $formatMoney(order.delivery_cost) }} ₸</p>
					</li>
					<li class="profile-history-list-item">
						<p class="profile-page-text">Итого</p>
						<p class="profile-page-text">{{ $formatMoney(order.total) }} ₸</p>
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
      currentDropdownIndex: false,
      isDropdownOpen: [],
			statuses: {
				0: 'Создан',
				1: 'Подвержден',
				3: 'Готов',
				4: 'Отменен',
				5: 'Успешный',
			},
			payment_types: {
				0: 'Наличными',
				1: 'Картой',
				2: 'Перевод',
			},
			delivery_types: {
				0: 'Курьером',
				1: 'Самовывоз',
			},
		}
  },
  mounted() {
    for (let i = 0; i < this.$getUser().orders.length; ++i) {
      this.isDropdownOpen.push(false)
    }
    this.isDropdownOpen = [...this.isDropdownOpen]
	},
  methods: {
		toggleDropdown(index) {
			this.isDropdownOpen[index] = !this.isDropdownOpen[index]
			this.isDropdownOpen = [...this.isDropdownOpen]
    },
		removeOrder(index) {
      this.$store.commit('SET_REMOVE_ORDER', {...this.$getUser().orders[index]})
		},
	}
}
</script>
