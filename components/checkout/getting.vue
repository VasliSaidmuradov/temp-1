<template>
	<div class="checkout-getting">
		<h3 class="section-title">Способ получения</h3>
		<div class="checkout-page-radio-wrp">
			<label class="checkout-page-radio" :class="{'--active' : currentType === 'pickup'}">
				<input v-model="currentType" name="getting" value="pickup" type="radio">
				<span class="checkout-page-subtitle">Самовывоз</span>
				<p class="checkout-page-radio-text">
					Без ожидания курьера! 2181 пункт в вашем регионе
				</p>
			</label>
			<label class="checkout-page-radio" :class="{'--active' : currentType === 'courier'}">
				<input v-model="currentType" name="getting" value="courier" type="radio">
				<span class="checkout-page-subtitle">Курьером</span>
				<p class="checkout-page-radio-text">
					В удобный для вас день и интервал времени
				</p>
			</label>
		</div>
		<div class="checkout-getting-pickup" v-if="currentType === 'pickup'">
			<h5 class="checkout-page-subtitle">Выберите магазин</h5>
			<select class="checkout-page-select">
				<option value="">г.Алматы, ул.Тимирязева 38/1</option>
				<option value="">г.Алматы, ул.Жибек-жолы 81/1</option>
			</select>
		</div>
		<div class="checkout-getting-courier" v-else>
			<select class="checkout-page-select">
				<option value="" selected disabled>Город</option>
				<option value="">г.Алматы</option>
				<option value="">г.Астана</option>
			</select>
			<input type="text" placeholder="Улица" class="checkout-page-input">
			<div class="checkout-page-input-wrp">
				<input type="text" placeholder="Дом" class="checkout-page-input">
				<input type="text" placeholder="Квартира / Офис" class="checkout-page-input">
				<!-- <input type="text" placeholder="Индекс" class="checkout-page-input"> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentType: 'pickup'
		}
	}
}
</script>
