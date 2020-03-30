<template>
	<div class="cart-list">
		<div class="cart-list-row" v-for="(item, index) in 3" :key="index">
			<div class="cart-list-img">
				<img src="/images/product.png" alt="Skiny image">
			</div>
			<div class="cart-list-name-wrp">
				<p class="cart-list-available --green">В наличии</p>
				<p class="cart-list-name">NATURA SIBERICA Caviar platinum</p>
			</div>
			<div class="cart-list-btn-wrp">
				<div class="product-counter">
					<button class="product-counter-decrease"></button>
					<span>1 шт</span>
					<button class="product-counter-increase"></button>
				</div>
				<div class="cart-list-price-wrp">
					<p class="cart-list-price">2 590 ₸</p>
					<p class="cart-list-old-price">2 590 ₸</p>
				</div>
				<button class="cart-list-favorites"></button>
				<button class="cart-list-remove"></button>
			</div>
		</div>
	</div>
</template>