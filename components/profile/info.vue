<template>
	<div class="profile-info-row">
    <!-- <span style="font-size: 12px">{{ user }}</span> -->
		<div class="profile-info-col">
			<h5 class="profile-page-subtitle">Учётная запись</h5>
			<label class="profile-page-label">Почта</label>
			<div class="profile-page-input-wrp">
				<input type="mail" class="profile-page-input" v-model="user.email" :disabled="toggleEmail">
				<button class="profile-page-edit" @click="toggleEmail = !toggleEmail">
          {{ toggleEmail ? 'Изменить' : 'Сохранить' }}</button>
			</div>
			<label class="profile-page-label">Телефон</label>
			<div class="profile-page-input-wrp">
				<client-only>
		      <the-mask 
            :mask="['+7 (###) ###-##-##']"
            class="profile-page-input"
            :disabled="togglePhone"
            type="tel"
            v-model="user.phone"
            required/>
		    </client-only>
        <div class="error-text" v-if="$getError('updatePhone')">{{ $getError('updatePhone') }}</div>
				<button v-if="togglePhone" @click="editPhone" class="profile-page-edit">Изменить</button>
        <button v-else @click="savePhone" class="profile-page-edit">Сохранить</button>
			</div>
			<label class="profile-page-label">Пароль</label>
			<div class="profile-page-input-wrp">
				<input type="password" class="profile-page-input" v-model="oldPass" :disabled="togglePass" placeholder="*****">
        <label v-if="!togglePass" class="profile-page-label">Новый пароль</label>
				<input v-if="!togglePass" v-model="pass" type="password" class="profile-page-input --new-pass">
				<label v-if="!togglePass" class="profile-page-label">Повторите пароль</label>
				<input v-if="!togglePass" v-model="passc" type="password" class="profile-page-input --new-pass">
				<div class="error-text" v-if="$getError('updatePassword')">{{ $getError('updatePassword') }}</div>
				<button class="profile-page-edit" @click="togglePass = !togglePass">
          {{ togglePass ? 'Изменить' : 'Сохранить' }}</button>
			</div>
		</div>
		<div class="profile-info-col">
			<h5 class="profile-page-subtitle">Личные данные</h5>
			<div class="profile-page-input-wrp">
				<label class="profile-page-label">ФИО</label>
				<input v-model="user.name" :disabled="toggleName" type="text" class="profile-page-input">
			</div>
			<!-- <div class="profile-page-input-wrp">
				<label class="profile-page-label">Дата рождения</label>
				<input type="text" class="profile-page-input" value="12 декабря 1990" disabled>
			</div> -->
      <div class="error-text" v-if="$getError('updateProfile')">{{ $getError('updateProfile') }}</div>
			<button class="profile-page-edit" @click="toggleName = !toggleName">
        {{ toggleName ? 'Изменить личные данные' : 'Сохранить личные данные' }}</button>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      togglePass: true,
      toggleEmail: true,
      toggleName: true,
      togglePhone: true,
      user: null,
      oldPass: null,
      pass: null,
      passc: null,
    }
  },
  created() {
    this.user = {...this.$getUser()}
  },
  watch: {
    togglePhone: async function(val) {
      if (val && this.user.phone != this.$getUser().phone) {
        // await this.$api.put('/user', { phone: this.user.phone }, 'updatePhone')
        await this.updateProfile({ phone: this.user.phone })
        if (!this.$getError('updatePhone')) {
          document.body.classList.add('--hidden'),
          this.$store.commit('SET_VERIFY_MODAL', this.user)
        }
      }
    },
    toggleName: async function(val) {
      if (val) await this.updateProfile({ name: this.user.name })
    },
    toggleEmail: async function(val) {
      if (val && this.user.email != this.$getUser().email) {
        await this.$api.put('/user', { login: this.user.email }, 'updateEmail')
      }
    },
    togglePass: async function(val) {
      if (val) {
        if (this.pass !== this.passc) {
          this.$setError('updatePassword', 'Пароли не совпадают!')
          return
        }
        await this.updatePassword({ password: this.oldPass, new_password: this.pass })
      }
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile',
      updatePassword: 'user/updatePassword'
    }),
    editPhone() {
      this.togglePhone = !this.togglePhone
    },
    savePhone() {
      this.togglePhone = !this.togglePhone
      this.$store.commit('SET_PROFILE_PHONE_MODAL', true)
    }
  }
}
</script>

<style>

</style>
