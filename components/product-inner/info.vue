<template>
  <div class="product-info">
    <div class="product-info-rating"></div>
    <h3 class="product-info-title">Описание</h3>
    <p class="product-info-text" v-html="info.description ? info.description : ''"></p>
    
  </div>
</template>
<script>
export default {
  props: {
    info: Object
	},
};
</script>
