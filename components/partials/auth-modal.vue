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
								<input type="text" placeholder="Email или мобильный телефон" class="auth-modal-input">
								<input type="password" placeholder="Пароль" class="auth-modal-input">
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
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			isOpen: 'auth/GET_MODAL_STATE'
		})
	},
	data() {
		return {
			isInnerOpen: false,
			currentTab: 'signin'
		}
	},
	methods: {
		closeModal() {
			document.body.classList.remove('--hidden'),
			this.isInnerOpen = false,
			this.currentTab = 'signin',
			setTimeout(() => {
				this.$store.commit('auth/SET_MODAL_STATE', false)
			},100)
		}
	}
}
</script>