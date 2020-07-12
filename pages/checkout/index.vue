<template>
  <div class="checkout-page">
    <modal />
    <div class="container pin-trigger">
      <div class="breadcrumbs">
        <nuxt-link to="/cart">Корзина /</nuxt-link>
        <nuxt-link to>Оформление заказа</nuxt-link>
      </div>
      <pre>
        {{ deliveryCost }}
      </pre>
      <form @submit.prevent="createOrder">
        <div class="checkout-page-row">
          <div class="checkout-page-col">
            <!-- <contacts /> -->
            <div class="checkout-contacts">
              <h3 class="section-title">Контактные данные</h3>
              <input
                v-model="order.name"
                type="text"
                placeholder="ФИО*"
                class="checkout-page-input"
                :class="{ '--border-red': !order.name && isSubmitted }"
                required
              />
              <client-only>
                <the-mask
                  v-model="order.phone"
                  :mask="['+# (###) ###-##-##']"
                  class="checkout-page-input"
                  type="tel"
                  placeholder="Номер телефона*"
                  required
                  :class="{ '--border-red': !order.phone && isSubmitted }"
                />
              </client-only>
              <input
                v-model="order.email"
                type="mail"
                placeholder="E-mail*"
                class="checkout-page-input"
                :class="{ '--border-red': !order.email && isSubmitted  }"
                required
              />
            </div>

            <!-- <getting /> -->
            <div class="checkout-getting">
              <h3 class="section-title">Способ получения</h3>
              <div class="checkout-page-radio-wrp">
                <label
                  class="checkout-page-radio"
                  :class="{'--active' : order.delivery_type === '1'}"
                >
                  <input v-model="order.delivery_type" name="getting" value="1" type="radio" />
                  <span class="checkout-page-subtitle">Самовывоз</span>
                  <p class="checkout-page-radio-text">Без ожидания курьера!</p>
                </label>
                <label
                  class="checkout-page-radio"
                  :class="{'--active' : order.delivery_type === '0'}"
                >
                  <input v-model="order.delivery_type" name="getting" value="0" type="radio" />
                  <span class="checkout-page-subtitle">Курьером</span>
                  <p class="checkout-page-radio-text">В удобный для вас день и интервал времени</p>
                </label>
              </div>
              <div class="checkout-getting-pickup" v-if="order.delivery_type === '1'">
                <h5 class="checkout-page-subtitle">Выберите магазин</h5>
                <!-- <select v-model="order.street" class="checkout-page-select" required>
                  <option value="ул.Тимирязева 38/1">г.Алматы, ул.Тимирязева 38/1</option>
                  <option value="ул.Жибек-жолы 38/1">г.Алматы, ул.Жибек-жолы 38/1</option>
                </select>-->
                <div class="checkout-page-dropdown-wrp">
                  <div class="checkout-page-current-market" @click="togglePickupDropdown">
                    <!-- <p>г.Алматы, ул.Жибек-жолы 38/1</p> -->
                    <p>{{ order.street }}</p>
                  </div>
                  <transition name="fade">
                    <div class="checkout-page-dropdown" v-if="isPickupDropdownOpen">
                      <p
                        @click.prevent="checkOrderStreet('г.Алматы, ул.Жибек-жолы 38/1')"
                      >г.Алматы, ул.Жибек-жолы 38/1</p>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="checkout-getting-courier" v-else>
                <!-- <select v-model="order.city" class="checkout-page-select" required>
                  <option value="" selected disabled>Город</option>
                  <option value="1" selected>г.Алматы</option>
                  <option value="0">Казахстан</option>
                </select>-->
                <div class="checkout-page-dropdown-wrp">
                  <div class="checkout-page-current-market" @click="toggleCourierDropdown">
                    <p>{{ currentCity }}</p>
                  </div>
                  <transition name="fade">
                    <div class="checkout-page-dropdown" v-if="isCourierDropdownOpen">
                      <p @click.prevent="checkOrderCity('1')">г.Алматы</p>
                      <p @click.prevent="checkOrderCity('0')">Казахстан</p>
                    </div>
                  </transition>
                </div>
                <input
                  v-if="order.city == '0'"
                  v-model="order.city_name"
                  type="text"
                  required
                  placeholder="Укажите город / населенный пункт"
                  class="checkout-page-input"
                  :class="{ '--border-red': !order.city_name && isSubmitted }"
                />
                <input
                  v-model="order.street"
                  required
                  type="text"
                  placeholder="Улица"
                  class="checkout-page-input"
                  :class="{ '--border-red': !order.street && isSubmitted }"
                />
                <div class="checkout-page-input-wrp" :class="{'--half' : order.city != '0'}">
                  <input
                    v-model="order.house"
                    type="text"
                    placeholder="Дом"
                    class="checkout-page-input"
                    :class="{ '--border-red': !order.house && isSubmitted }"
                  />
                  <input
                    v-model="order.flat"
                    type="text"
                    placeholder="Квартира / Офис"
                    class="checkout-page-input"
                    :class="{ '--border-red': !order.flat && isSubmitted }"
                  />
                  <input
                    v-if="order.city == '0'"
                    v-model="order.index"
                    type="text"
                    placeholder="Индекс"
                    class="checkout-page-input"
                    :class="{ '--border-red': !order.index && isSubmitted }"
                  />
                </div>
              </div>
            </div>
            <!-- <pre>{{ order }}</pre> -->

            <!-- <payment /> -->
            <div class="checkout-payment">
              <h3 class="section-title">Способы оплаты</h3>
              <label class="checkout-payment-radio">
                <input
                  v-model="order.payment_type"
                  value="1"
                  name="payment-type"
                  checked
                  type="radio"
                />
                <span class="checkout-payment-checkmark"></span>
                <p class="checkout-payment-radio-title">Картой онлайн</p>
              </label>
              <label v-if="order.city === '1'" class="checkout-payment-radio">
                <input v-model="order.payment_type" value="0" name="payment-type" type="radio" />
                <span class="checkout-payment-checkmark"></span>
                <div>
                  <p class="checkout-payment-radio-title">Наличными при получении</p>
                  <p class="checkout-payment-radio-text">Оплата наличными курьеру при получении</p>
                </div>
              </label>
            </div>

            <!-- <extra /> -->
            <div class="checkout-extra">
              <h3 class="section-title">Дополнительно</h3>
              <h5 class="checkout-page-subtitle">Комментарий к заказу</h5>
              <textarea
                v-model="order.comment"
                placeholder="Ваш комментарий к заказу"
                class="checkout-page-input"
              ></textarea>
            </div>
          </div>
          <div class="checkout-page-col">
            <!-- <checkout-aside /> -->
            <div class="order-aside">
              <div class="order-aside-products">
                <div class="order-aside-product" v-for="product in products.data" :key="product.id">
                  <div class="order-aside-product-img">
                    <img :src="product.image" :alt="product.name" />
                  </div>
                  <p class="order-aside-product-name">{{ product.name }}</p>
                </div>
              </div>
              <div class="order-aside-list">
                <div class="order-aside-row">
                  <p class="order-aside-title">Товары ({{ cartQuantity }})</p>
                  <p class="order-aside-list-price">{{ $formatMoney(sum) }} ₸</p>
                </div>
                <div class="order-aside-row">
                  <p class="order-aside-title">Доставка</p>
                  <p class="order-aside-list-price">{{ $formatMoney(deliveryCost.delivery_cost) }} ₸</p>
                </div>
                <div class="order-aside-row">
                  <p class="order-aside-title">Скидка</p>
                  <p class="order-aside-list-price --red">-{{ $formatMoney(discount) }} ₸</p>
                </div>
              </div>
              <div class="order-aside-total">
                <div class="order-aside-row">
                  <p class="order-aside-total-title">Итого</p>
                  <p class="order-aside-total-text">{{ $formatMoney(total) }} ₸</p>
                </div>
              </div>
              <div class="order-aside-link-wrp">
                <button
                  type="submit"
                  class="button --main-color"
                  :disabled="sum <= 0"
                  @click="isSubmitted = true"
                >Оформить заказ</button>
                <!-- <nuxt-link class="button --white" to="">Перейти к оплате</nuxt-link> -->
              </div>
              <p v-if="$getError('order')" class="error-text">{{ $getError('order') }}</p>
              <pre>
                {{ order }}
              </pre>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import modal from "@/components/checkout/modal";
import checkoutAside from "@/components/checkout/aside";
import contacts from "@/components/checkout/contacts";
import getting from "@/components/checkout/getting";
import payment from "@/components/checkout/payment";
import extra from "@/components/checkout/extra";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    modal,
    contacts,
    checkoutAside,
    getting,
    payment,
    extra
  },
  middleware: ["cart"],
  data() {
    return {
      currentType: "pickup",
      isPickupDropdownOpen: false,
      isCourierDropdownOpen: false,
      order: {
        name: null,
        phone: null,
        email: null,
        city: "1",
        city_name: "",
        delivery_type: "1",
        delivery_cost: 0,
        street: "г.Алматы, ул.Жибек-жолы 38/1",
        house: null,
        flat: null,
        index: null,
        comment: null,
        payment_type: 0
      },
      isSubmitted: false,
    };
  },
  watch: {
    "$route.path": function() {
      this.order.phone = null;
    },
    "order.phone": function(val) {
      if (val && val.length && val[0] != "7") {
        this.order.phone = "7" + val.substring(1);
      }
    },
    "order.delivery_type": async function(val) {
      if (val && val === "1") {
        this.order.street = "г.Алматы, ул.Жибек-жолы 38/1";
        // await this.$store.commit('cart/RESET_DELIVERY_COST');
      } else {
        this.order.street = null;
        if (val === "0" && this.order.city === "1") {
          console.log('val: ', val)
          await this.fetchDeliveryCost({ city_id: 1, total: this.sum });
        } else {
          console.log('val else: ', val)
          await this.fetchDeliveryCost({ city_id: 0, total: this.sum });
        }
      }
    },
    "order.city": async function(val) {
      if (val && val === "1") {
        this.order.payment_type = 0;
      } else {
        this.order.payment_type = 1
      }
      await this.fetchDeliveryCost({ city_id: val, total: this.sum })
    }
  },
  computed: {
    ...mapGetters({
      products: "cart/GET_PRODUCTS",
      sum: "cart/GET_TOTAL",
      bonuses: "cart/GET_BONUSES",
      discount: "cart/GET_DISCOUNT",
      cartQuantity: "cart/GET_QUANTITY",
      deliveryCost: "cart/GET_DELIVERY_COST",
    }),
    // delivery() {
    //   let deliveryCost = 0;
    //   if (this.order.city == "0" && this.sum < 12000) deliveryCost = 2000;
    //   else if (
    //     this.order.city == "1" &&
    //     this.sum < 7000 &&
    //     this.order.delivery_type == "0"
    //   )
    //     deliveryCost = 500;
    //   return deliveryCost;
    // },
    total() {
      return this.sum - this.discount + this.deliveryCost.delivery_cost;
    },
    currentCity() {
      switch (this.order.city) {
        case "1":
          return "г.Алматы";
          break;
        case "0":
          return "Казахстан";
          break;
      }
    }
  },
  methods: {
    ...mapActions({
      checkout: "cart/checkout",
      fetchDeliveryCost: "cart/deliveryCost",
    }),
    togglePickupDropdown() {
      this.isPickupDropdownOpen = !this.isPickupDropdownOpen;
    },
    toggleCourierDropdown() {
      this.isCourierDropdownOpen = !this.isCourierDropdownOpen;
    },
    checkOrderStreet(val) {
      this.order.street = val;
      this.togglePickupDropdown();
    },
    checkOrderCity(val) {
      this.order.city = val;
      this.toggleCourierDropdown();
    },
    async createOrder(redirect) {
      try {
        if (this.order.phone.length < 10) {
          this.$alert({
            message: "Неправильный номер телефона!",
            type: "error"
          });
          return;
        }
        if (this.order.delivery_type === "1") {
          (this.order.city = "1"),
            (this.order.house = null),
            (this.order.flat = null),
            (this.order.index = null);
        }
        const paybox = await this.checkout(this.order);
        if (this.order.payment_type == "1") {
          const url = paybox.join("?");
          window.location.href = url;
          return;
        }
        if (paybox) {
          // document.body.classList.add('--hidden')
          this.$store.commit("cart/setCheckoutModal", true);
          this.resetData();
        } else {
          this.$setError("order", "Произошла ошибка при оформлении заказа.");
          this.$alert({
            message:
              "Произошла ошибка при оформлении заказа. Попробуйте еще раз или свяжитесь с нами по телефону +7 (777) 262-30-60",
            type: "error"
          });
        }
      } catch (error) {
        console.log("Create order", error);
      }
    },
    resetData() {
      this.order = {
        name: null,
        phone: null,
        email: null,
        city: "1",
        city_name: "",
        street: null,
        house: null,
        flat: null,
        index: null,
        comment: null,
        payment_type: 0
      };
    }
  },
  mounted() {
    if (this.$checkAuth()) {
      this.order.name = this.$getUser().name;
      this.order.email = this.$getUser().email;
      this.order.phone = this.$getUser().phone;
    }
    if (window.innerWidth > 426) {
      const pinScene = this.$scrollmagic
        .scene({
          triggerElement: ".pin-trigger",
          triggerHook: 0,
          duration: "100%"
        })
        .setPin(".order-aside");
      this.$scrollmagic.addScene(pinScene);
    }
    // if (this.order.delivery_type === "1") {
    //   this.$store.commit('cart/RESET_DELIVERY_COST');
    // }
  },
};
</script>
