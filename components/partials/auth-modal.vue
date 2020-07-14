<template>
<transition name="fade" @before-enter="isInnerOpen = true">
  <div v-if="isOpen" class="auth-modal">
    <div @click="closeModal" class="auth-modal-overlay"></div>
    <transition name="slide-to-left">
      <div class="auth-modal-inner">
        <transition name="fade">
          <div v-if="currentTab === 'signin'" class="auth-modal-content --signin">
            <button @click="closeModal" class="auth-modal-close"></button>
            <div class="auth-modal-left">
              <form @submit.prevent="sendSignin" class="auth-modal-signin">
                <h3 class="auth-modal-title">Вход</h3>
                <input type="text" placeholder="Email или мобильный телефон" class="auth-modal-input" v-model="phoneEmail" required />
                <input type="password" placeholder="Пароль" class="auth-modal-input" v-model="password" required />
                <div class="auth-modal-btn-wrp">
                  <button class="button --main-color">Войти</button>
                  <button class="auth-modal-forgot" @click="currentTab = 'restore'">Забыли пароль?</button>
                </div>
              </form>
            </div>
            <div class="auth-modal-right">
              <h3 class="auth-modal-title">Еще не зарегистрированы?</h3>
              <p class="auth-modal-text">Преимущества зарегистрированных пользователей</p>
              <ul class="auth-modal-list">
                <li>
                  <check />
                  <p class="auth-modal-text">Получение информации о новинках и акциях</p>
                </li>
                <li>
                  <check />
                  <p class="auth-modal-text">Бонусы постоянным покупателям</p>
                </li>
                <li>
                  <check />
                  <p class="auth-modal-text">Просмотр истории заказов в личном кабинете</p>
                </li>
              </ul>
              <button @click="currentTab = 'register'" class="button --white">зарегистрироваться</button>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="currentTab === 'register'" class="auth-modal-content">
            <button @click="closeModal" class="auth-modal-close"></button>
            <div class="auth-modal-left">
              <h3 class="auth-modal-title">Уже зарегистрированы?</h3>
              <p class="auth-modal-text">Преимущества зарегистрированных пользователей</p>
              <ul class="auth-modal-list">
                <li>
                  <check />
                  <p class="auth-modal-text">Получение информации о новинках и акциях</p>
                </li>
                <li>
                  <check />
                  <p class="auth-modal-text">Бонусы постоянным покупателям</p>
                </li>
                <li>
                  <check />
                  <p class="auth-modal-text">Просмотр истории заказов в личном кабинете</p>
                </li>
              </ul>
              <button @click="currentTab = 'signin'" class="button --white">Войти</button>
            </div>
            <div class="auth-modal-right">
              <form @submit.prevent="sendSignup" class="auth-modal-register">
                <h3 class="auth-modal-title">Регистрация</h3>
                <input type="text" placeholder="Email" class="auth-modal-input" v-model="user.email" required />
                <client-only>
                  <the-mask :mask="['+# (###) ###-##-##']" class="auth-modal-input" type="tel" placeholder="Телефон" required v-model="user.phone" />
                </client-only>
                <input type="text" placeholder="ФИО" class="auth-modal-input" v-model="user.name" />
                <input type="password" placeholder="Пароль" class="auth-modal-input" v-model="user.password" required />
                <input type="password" placeholder="Повторите пароль" class="auth-modal-input" v-model="user.passwordc" />
                <client-only>
                  <label class="auth-modal-checkbox">
                    <input type="checkbox" @change="confirmation = !confirmation" />
                    <div class="auth-modal-checkmark">
                      <checkmark />
                    </div>
                    <p class="auth-modal-text">
                      Нажимая кнопку «Зарегистрироваться», вы принимаете условия договора
                      <nuxt-link to>оферты</nuxt-link>&nbsp;и
                      <nuxt-link to>политики конфиденциальности</nuxt-link>
                    </p>
                  </label>
                </client-only>
                <button
                  :disabled="!confirmation"
                  type="submit"
                  class="button"
                  :class="{ '--main-color': confirmation , '--disabled': !confirmation }"
                  >зарегистрироваться</button>
              </form>
            </div>
            <!-- user: {{ user }} -->
          </div>
        </transition>
        <transition name="fade">
          <div v-if="currentTab === 'restore'" class="auth-modal-content --restore">
            <button @click="closeModal" class="auth-modal-close"></button>
            <form @submit.prevent="sendReset" class="auth-modal-restore">
              <h3 class="auth-modal-title">Восстановление пароля</h3>
              <p class="auth-modal-text">Введите свой e-mail и мы вышлем вам пароль</p>
              <input v-model="restore.email" type="text" placeholder="Email" class="auth-modal-input" />
              <div class="auth-modal-btn-wrp">
                <button 
                  :disabled="!validateEmail"
                  class="button"
                  :class="{ '--main-color': validateEmail , '--disabled': !validateEmail }"
                  @click=" currentTab='restoreSuccess'"
                  >Отправить</button>
                  <button @click=" currentTab='signin'" class=" button --white">я вспомнил пароль</button>
              </div>
            </form>
            <!-- Reset: {{ restore }} -->
          </div>
        </transition>
        <transition name="fade">
          <div v-if="currentTab === 'restoreSuccess'" class="auth-modal-content --restore">
            <button @click="closeModal" class="auth-modal-close"></button>
            <div class="auth-modal-restore">
              <h3 class="auth-modal-title">Восстановление пароля</h3>
              <p class="auth-modal-text">Письмо с восстановлением пароля успешно отправлено</p>
              <img src="/icons/email-success.svg" alt="Skiny icon" class="auth-modal-img" />
              <div class="auth-modal-btn-wrp">
                <button class="button --main-color" @click="closeModal">Вернуться на главную</button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</transition>
</template>

<script>
import {
  mapActions,
  mapGetters
} from "vuex";
import checkmark from "@/static/icons/checkmark.svg";
import check from "@/static/icons/check.svg";
export default {
  data() {
    return {
      currentTab: "signin",
      phoneEmail: null,
      password: null,
      user: {
        email: null,
        phone: null,
        name: null,
        password: null,
        passwordc: null
      },
      restore: {
        phone: null,
        email: null
      },
      confirmation: false
    };
  },
  components: {
    checkmark,
    check
  },
  watch: {
    "route.path": function () {
      this.phoneEmail = null;
      this.password = null;
      this.clearUser();
      this.user.phone = null;
    },
    "user.phone": function (val) {
      if (val && val.length >= 1 && val[0] != "7") {
        this.user.phone = "7" + val.substring(1);
      }
    }
  },
  computed: {
    ...mapGetters({
      isOpen: "auth/GET_MODAL_STATE",
      isSignedIn: "auth/GET_IS_SIGNEDIN"
    }),
    validateEmail() {
      return this.restore.email && this.restore.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm) ? true : false
    }
  },
  methods: {
    ...mapActions({
      signin: "auth/signin",
      signup: "auth/signup",
      reset: "auth/reset"
    }),
    async sendSignin() {
      try {
        const res = await this.signin({
          login: this.phoneEmail,
          password: this.password
        });
        this.$router.push("/profile");
        this.closeModal();
      } catch (error) {
        this.$alert({
          message: this.$getError("signin"),
          type: "error"
        });
      } finally {
        this.password = null;
      }
    },
    async sendSignup() {
      try {
        if (this.user.password !== this.user.passwordc) {
          this.$getError("signup", "Пароли не совпадают!");
          this.$alert({
            message: "Пароли не совпадают!",
            type: "error"
          });
          this.user.password = null;
          this.user.passwordc = null;
          return;
        }

        const res = await this.signup({
          ...this.user,
          login: this.user.email
        });
        if (this.$getError("signup")) {
          if (this.$getError("signup") === "validation.unique") {
            this.$alert({
              message: " Такой e-mail и/или телефон уже зарегистрирован!",
              type: "error"
            });
          }
          return;
        }

        this.$alert({
          message: "Письмо с подтверждением отправлено на ваш e-mail",
          type: "success"
        });
        // this.openVerify({ ...this.user });
        this.clearUser();
      } catch (error) {
        console.log("Signup error: ", error);
      }
    },
    closeModal() {
      document.body.classList.remove("--hidden"),
        (this.isInnerOpen = false),
        (this.currentTab = "signin"),
        this.$store.commit("auth/SET_MODAL_STATE", false);
    },
    clearUser() {
      this.user = {
        email: null,
        phone: null,
        name: null,
        password: null,
        passwordc: null
      };
    },
    openVerify(user) {
      document.body.classList.add("--hidden");
      this.$store.commit("SET_VERIFY_MODAL", user);
    },
    async sendReset() {
      await this.reset({
        login: this.restore.email
      });
    }
  }
};
</script>
