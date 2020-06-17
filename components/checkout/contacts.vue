<template>
  <div class="checkout-contacts">
    <h3 class="section-title">Контактные данные</h3>
    <input type="text" placeholder="ФИО" class="checkout-page-input" />
    <client-only>
      <the-mask
        :mask="['+# (###) ###-##-##']"
        v-model="phone"
        class="checkout-page-input"
        type="tel"
        placeholder="Номер телефона"
        required
      />
    </client-only>
    <input type="mail" placeholder="E-mail" class="checkout-page-input" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: null
    };
  },
  watch: {
    "$route.path": function() {
      this.phone = null;
    },
    'phone': function(val) {
      if (val && val.length >= 1 && val[0] != "7") {
        this.phone = "7" + val.substring(1);
      }
    }
  }
};
</script>