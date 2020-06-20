<template>
  <div class="profile-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to="/profile">Мой кабинет /</nuxt-link>
        <nuxt-link to>Бонусы</nuxt-link>
      </div>
      <div class="profile-page-row">
        <div class="profile-page-left">
          <profile-nav />
        </div>
        <div class="profile-page-right">
          <h5 class="profile-page-title">Мои бонусы</h5>
          <p
            class="profile-page-text"
            v-if="$getUser().bonus"
          >У вас {{ $formatMoney($getUser().bonus) }} бонусов</p>
          <p class="profile-page-text" v-else>У вас нет бонусов с покупок.</p>
          <nuxt-link class="profile-page-link" to="/help/bonuses">Подробнее о бонусах</nuxt-link>
          <bonuses-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileNav from "@/components/profile/nav";
import bonusesTable from "@/components/profile/bonuses-table";

export default {
  components: {
    profileNav,
    bonusesTable
  },
  middleware: ["auth", "user"]
};
</script>
