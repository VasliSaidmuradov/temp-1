<template>
	<transition name="fade" @before-enter="isInnerOpen = true">
		<div v-if="isOpen" class="auth-modal">
			<div @click="closeModal" class="auth-modal-overlay"></div>
			<transition name="slide-to-left">
				<div class="auth-modal-inner">
					<button @click="closeModal" class="auth-modal-close"></button>
					<transition name="fade">
						<div v-if="currentTab === 'signin'" class="auth-modal-content">
							<form @submit.prevent="sendSignin" class="auth-modal-signin">
								<h3 class="auth-modal-title">Вход</h3>
								<input type="text" placeholder="Email или мобильный телефон" class="auth-modal-input" v-model="phoneEmail" required>
								<input type="password" placeholder="Пароль" class="auth-modal-input" v-model="password" required>
								<nuxt-link to class="auth-modal-forgot" @click="currentTab = 'restore'">Забыли пароль?</nuxt-link>
								<div class="auth-modal-btn-wrp">
									<button class="button --black">Войти</button>
									<button @click="currentTab = 'register'" class="button --white">зарегистрироваться</button>
								</div>
							</form>
              <!-- {{ phoneEmail }}
              {{ password }}
              {{ isSignedIn }} -->
						</div>
					</transition>
					<transition name="fade">
						<div v-if="currentTab === 'register'" class="auth-modal-content">
							<form @submit.prevent="sendSignup" class="auth-modal-register">
								<h3 class="auth-modal-title">Регистрация</h3>
								<input type="text" placeholder="Email" class="auth-modal-input" v-model="user.email" required>
								<client-only>
						      <the-mask :mask="['+7 (###) ###-##-##']" class="auth-modal-input" type="tel" placeholder="Телефон" required v-model="user.phone" />
						    </client-only>
								<input type="text" placeholder="ФИО" class="auth-modal-input" v-model="user.name" >
								<input type="password" placeholder="Пароль" class="auth-modal-input" v-model="user.password" required >
								<input type="password" placeholder="Повторите пароль" class="auth-modal-input" v-model="user.passwordc" >
                <client-only>
                  <label class="auth-modal-checkbox">
                    <input type="checkbox">
                    <div class="auth-modal-checkmark">
                      <checkmark />
                    </div>
                    <p class="auth-modal-text">
                      Нажимая кнопку «Зарегистрироваться», вы принимаете условия договора <nuxt-link to="">оферты</nuxt-link> и <nuxt-link to="">политики конфиденциальности</nuxt-link>
                    </p>
                  </label>
                </client-only>
								<!-- <div class="error-text" v-if="$getError('signup')">{{ $getError('signup') }}</div> -->
								<!-- <div class="success-text" v-if="true">{{ $getError('signin') }}</div> -->
                <div class="auth-modal-btn-wrp">
									<button type="submit" class="button --black">зарегистрироваться</button>
									<button @click="currentTab = 'signin'" class="button --white">Назад</button>
								</div>
							</form>
              <!-- user: {{ user }} -->
						</div>
					</transition>
					<transition name="fade">
						<div v-if="currentTab === 'restore'" class="auth-modal-content">
							<form @submit.prevent="sendReset" class="auth-modal-restore">
								<h3 class="auth-modal-title">Восстановление пароля</h3>
								<p class="auth-modal-text">Введите свой e-mail и мы вышлем вам пароль</p>
								<input v-model="restore.email" type="text" placeholder="Email" class="auth-modal-input">
								<div class="auth-modal-btn-wrp">
									<button class="button --black" @click="currentTab = 'restoreSuccess'">Отправить</button>
									<button @click="currentTab = 'signin'" class="button --white">я вспомнил пароль</button>
								</div>
							</form>
              <!-- Reset: {{ restore }} -->
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import checkmark from '@/static/icons/checkmark.svg'
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
        email: null,
      }
    };
  },
  components: {
    checkmark
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
      isOpen: "auth/GET_MODAL_STATE",
      isSignedIn: 'auth/GET_IS_SIGNEDIN'
    })
  },
  methods: {
    ...mapActions({
      signin: "auth/signin",
      signup: "auth/signup",
      reset: "auth/reset"
    }),
    async sendSignin() {
      await this.signin({
        login: this.phoneEmail,
        password: this.password
      });
      if (!this.$getError("signin")) {
        this.$router.push("/profile");
        this.closeModal();
      }
      this.password = null;
    },
    async sendSignup() {
      if (this.user.password !== this.user.passwordc) {
        this.$getError("signup", "Пароли не совпадают!");
        this.user.password = null;
        this.user.passwordc = null;
        return;
      }

      await this.signup({...this.user, login: this.user.email});

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
    },
    openVerify(user) {
			document.body.classList.add('--hidden'),
			this.$store.commit('SET_VERIFY_MODAL', user)
    },
    async sendReset() {
			await this.reset({ login: this.restore.email })
		}
  }
};
</script>
