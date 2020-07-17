<template>
  <transition name="fade">
    <div v-if="hasOffset" class="to-top" @click="toTop">
      <Arrow />
    </div>
  </transition>
</template>

<script>
import Arrow from "@/static/icons/arrow-down.svg";

export default {
  components: {
    Arrow,
  },
  data() {
    return {
      hasOffset: false,
    }
  },
  computed: {},
  methods: {
    toTop() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      if (window.pageYOffset > 300) {
        this.hasOffset = true;
      } else {
        this.hasOffset = false;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
.to-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 100;
  background-color: var(--color-base);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-top: -2px;
    
    path {
      fill: #fff;
    }
  }
}

@media screen and (max-width: 815px) {
  .to-top {
    bottom: 10px;
    width: 65px;
    height: 65px;
  }
}
</style>
