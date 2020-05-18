<template>
	<div class="profile-bonuses-table">
		<h5 class="profile-page-title">История операций</h5>
		<div class="profile-page-table">
			<div class="profile-page-table-row">
				<div class="profile-page-table-col">
					<p class="profile-page-table-heading">Время</p>
				</div>
				<div class="profile-page-table-col">
					<p class="profile-page-table-heading">Описание</p>
				</div>
				<div class="profile-page-table-col">
					<p class="profile-page-table-heading">Сума (тг)</p>
				</div>
			</div>
			<div v-for="(bonus, index) in $getUser().bonuses" :key="index" class="profile-page-table-row">
				<div class="profile-page-table-col">
					<p class="profile-page-text">
            {{ $formatDate(bonus.created_at, 'DD.MM.YYYY') }}
             / {{ $formatDate(bonus.created_at, 'HH:MM') }}
          </p>
				</div>
				<div class="profile-page-table-col">
          <p class="profile-page-text" v-if="bonus.order_id">Артикул №{{ bonus.order_id }}</p>
				</div>
				<div class="profile-page-table-col">
					<!-- <p class="profile-page-text">200</p> -->
          <p class="profile-page-text" v-if="bonus.added">+{{ $formatMoney(bonus.added) }}</p>
					<p class="profile-page-text" v-if="bonus.used">-{{ $formatMoney(bonus.used) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
