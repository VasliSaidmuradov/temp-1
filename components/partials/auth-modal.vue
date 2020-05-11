<template>
  <transition name="fade" @before-enter="isInnerOpen = true">
    <div v-if="isOpen" class="auth-modal">
      <div @click="closeModal" class="auth-modal-overlay"></div>
      <transition name="slide-to-left">
        <div v-if="isInnerOpen" class="auth-modal-inner">
          <button @click="closeModal" class="auth-modal-close"></button>
          <transition name="fade">
            <div v-if="currentTab === 'signin'" class="auth-modal-content">
              <div class="auth-modal-signin">
                <h3 class="auth-modal-title">Вход</h3>
                <input
                  type="text"
                  placeholder="Email или мобильный телефон"
                  class="auth-modal-input"
                  v-model="phoneEmail"
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  class="auth-modal-input"
                  v-model="password"
                  required
                />
                <button class="auth-modal-forgot">Забыли пароль?</button>
                <div class="auth-modal-btn-wrp">
                  <button class="button --black">Войти</button>
                  <button @click="currentTab = 'register'" class="button --white">зарегистрироваться</button>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="currentTab === 'register'" class="auth-modal-content">
              <form @submit.prevent="sendSignup" class="auth-modal-register">
                <h3 class="auth-modal-title">Регистрация</h3>
                <input
                  type="text"
                  placeholder="Email"
                  class="auth-modal-input"
                  v-model="user.email"
                  required
                />
                <client-only>
                  <the-mask
                    :mask="['+7 (###) ###-##-##']"
                    class="auth-modal-input"
                    type="tel"
                    placeholder="Телефон"
                    required
                    v-model="user.phone"
                  />
                </client-only>
                <input type="text" placeholder="ФИО" class="auth-modal-input" v-model="user.name" />
                <input
                  type="password"
                  placeholder="Пароль"
                  class="auth-modal-input"
                  v-model="user.password"
                  required
                />
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  class="auth-modal-input"
                  v-model="user.passwordc"
                />
                <div class="auth-modal-btn-wrp">
                  <button type="submit" class="button --black">зарегистрироваться</button>
                  <button @click="currentTab = 'signin'" class="button --white">Назад</button>
                </div>
              </form>
              user: {{ user }}
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </transition>
  <!-- 
	<transition name="fade" @before-enter="isInnerOpen = true">
		<div v-if="isOpen" class="auth-modal">
			<div @click="closeModal" class="auth-modal-overlay"></div>
			<transition name="slide-to-left">
				<div v-if="isInnerOpen" class="auth-modal-inner">
					<button @click="closeModal" class="auth-modal-close"></button>
					<transition name="fade">
						<div v-if="currentTab === 'signin'" class="auth-modal-content">
							<div class="auth-modal-signin">
								<h3 class="auth-modal-title">Вход</h3>
								<input type="text" placeholder="Email или мобильный телефон" class="auth-modal-input">
								<input type="password" placeholder="Пароль" class="auth-modal-input">
								<button class="auth-modal-forgot" @click="currentTab = 'restore'">Забыли пароль?</button>
								<div class="auth-modal-btn-wrp">
									<button class="button --black">Войти</button>
									<button @click="currentTab = 'register'" class="button --white">зарегистрироваться</button>
								</div>
							</div>
						</div>
					</transition>
					<transition name="fade">
						<div v-if="currentTab === 'register'" class="auth-modal-content">
							<div class="auth-modal-register">
								<h3 class="auth-modal-title">Регистрация</h3>
								<input type="text" placeholder="Email" class="auth-modal-input">
								<client-only>
						            <the-mask :mask="['+7 (###) ###-##-##']" class="auth-modal-input" type="tel" placeholder="Телефон" required/>
						        </client-only>
								<input type="text" placeholder="ФИО" class="auth-modal-input">
								<input type="password" placeholder="Пароль" class="auth-modal-input">
								<input type="password" placeholder="Повторите пароль" class="auth-modal-input">
								<div class="auth-modal-btn-wrp">
									<button class="button --black">зарегистрироваться</button>
									<button @click="currentTab = 'signin'" class="button --white">Назад</button>
								</div>
							</div>
						</div>
					</transition>
					<transition name="fade">
						<div v-if="currentTab === 'restore'" class="auth-modal-content">
							<div class="auth-modal-restore">
								<h3 class="auth-modal-title">Восстановление пароля</h3>
								<p class="auth-modal-text">Введите свой e-mail и мы вышлем вам пароль</p>
								<input type="text" placeholder="Email" class="auth-modal-input">
								<div class="auth-modal-btn-wrp">
									<button class="button --black" @click="currentTab = 'restoreSuccess'">Отправить</button>
									<button @click="currentTab = 'signin'" class="button --white">я вспомнил пароль</button>
								</div>
							</div>
						</div>
					</transition>
					<transition name="fade">
						<div v-if="currentTab === 'restoreSuccess'" class="auth-modal-content">
							<div class="auth-modal-restore">
								<h3 class="auth-modal-title">Восстановление пароля</h3>
								<p class="auth-modal-text">Письмо с восстановлением пароля успешно отправлено</p>
								<img src="/icons/email-success.svg" alt="Skiny icon" class="auth-modal-img">
								<div class="auth-modal-btn-wrp">
									<button class="button --black" @click="closeModal">Вернуться на главную</button>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</transition>
		</div>
	</transition>

  -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isInnerOpen: false,
      currentTab: "signin",
      phoneEmail: null,
      password: null,
      user: {
        email: null,
        phone: null,
        name: null,
        password: null,
        passwordc: null
      }
    };
  },
  watch: {
    "route.path": function() {
      this.phoneEmail = null;
      this.password = null;
      this.clearUser();
    }
  },
  computed: {
    ...mapGetters({
      isOpen: "auth/GET_MODAL_STATE"
    })
  },
  methods: {
    ...mapActions({
      signin: "auth/signin",
      signup: "auth/signup"
    }),
    async sendSignin() {
      await this.signin({
        login: this.phoneEmail,
        password: this.password
      });
      if (!this.$getError("signin")) {
        this.$router.push("/profile");
      }
      this.password = null;
    },
    async sendSignup() {
      if (this.user.password != this.user.passwordc) {
        this.$getError("signup", "Пароли не совпадают!");
        this.user.password = null;
        this.user.passwordc = null;
        return;
      }
      await this.signup(this.user);
      if (!this.$getError("signup")) {
        this.openVerify({ ...this.user });
        this.clearUser();
      }
    },
    closeModal() {
      document.body.classList.remove("--hidden"),
        (this.isInnerOpen = false),
        (this.currentTab = "signin"),
        setTimeout(() => {
          this.$store.commit("auth/SET_MODAL_STATE", false);
        }, 100);
    },
    clearUser() {
      this.user = {
        email: null,
        phone: null,
        name: null,
        password: null,
        passwordc: null
      };
    }
  }
};
</script>