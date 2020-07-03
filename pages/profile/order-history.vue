<template>
  <div class="profile-page">
    <remove-order />
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to="/profile">Мой кабинет /</nuxt-link>
        <nuxt-link to>История заказов</nuxt-link>
      </div>
      <div class="profile-page-row">
        <div class="profile-page-left">
          <profile-nav />
        </div>
        <div class="profile-page-right">
          <div class="profile-page-block --margin-bottom">
            <h5 class="profile-page-subtitle" v-if="!$getUser().orders.length">Список заказов пуст</h5>
            <nuxt-link to="/catalog" class="button --main-color">Перейти к каталогу</nuxt-link>
          </div>
          <history-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileNav from "@/components/profile/nav";
import historyTable from "@/components/profile/history-table";
import removeOrder from "@/components/profile/modals/remove-order";

export default {
  components: {
    profileNav,
    historyTable,
    removeOrder
  },
  middleware: ["auth", "user"]
};
</script>
