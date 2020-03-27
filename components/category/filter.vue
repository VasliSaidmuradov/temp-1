<template>
	<div class="filter">
		<button class="filter-clear">Очистить фильтр</button>
		<div class="filter-block">
			<div class="filter-range-top">
				<p class="filter-title">Цена</p>
				<button>Сбросить</button>
			</div>
			<div class="filter-range-bot">
				<div class="filter-input-wrp">
					<label>от</label>
					<input type="text" value="200" class="filter-input">
				</div>
				<div class="filter-input-wrp">
					<label>до</label>
					<input type="text" value="1200" class="filter-input">
				</div>
			</div>
		</div>
		<div class="filter-block">
			<p class="filter-title">Бренд</p>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Academie</p>
			</label>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Academie</p>
			</label>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Academie</p>
			</label>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Academie</p>
			</label>
		</div>
		<div class="filter-block">
			<p class="filter-title">Эксклюзивные предложения</p>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Скидки</p>
			</label>
			<label class="filter-checkbox">
				<input type="checkbox">
				<div class="filter-checkmark"></div>
				<p>Товары с подарками</p>
			</label>
		</div>
	</div>
</template>