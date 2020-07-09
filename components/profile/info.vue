<template>
  <div class="profile-info-row">
    <transition name="fade">
      <edit-email v-if="isEmailModalOpen"
        @sendEmail="openEmailConfirm"
        @closeEmailModal="closeEmailModal"/>
    </transition>
    <transition name="fade">
      <email-confirm v-if="isEmailConfirmOpen" @closeEmailConfirm="closeEmailConfirm"/>
    </transition>
    <transition name="fade">
      <edit-pass v-if="isPassModalOpen" 
        @savePass="openPassConfirm"
        @closePassModal="closePassModal"/>
    </transition>
    <transition name="fade">
      <pass-confirm v-if="isPassConfirmOpen" @closePassConfirm="closePassConfirm"/>
    </transition>
    <!-- <span style="font-size: 12px; background: #1da7af4f">{{ user.name }}: {{ user.phone }}</span> -->
    <div class="profile-info-col profile-page-block --profile --margin-bottom">
      <h5 class="profile-page-subtitle">Профиль</h5>
      <div class="profile-page-label-wrp" @click="openEmailModal">
        <label class="profile-page-label">
          <email />
          Почта
        </label>
        <p>{{user.email}}</p>
      </div>
      <!-- <div class="profile-page-input-wrp">
        <input type="mail" class="profile-page-input" v-model="user.email" :disabled="toggleEmail" />
        <button
          class="profile-page-edit"
          @click="toggleEmail = !toggleEmail">
          {{ toggleEmail ? 'Изменить' : 'Сохранить' }}
        </button>
      </div> -->
      <div class="profile-page-label-wrp" @click="editPhone">
        <label class="profile-page-label">
          <phone />
          Телефон
        </label>
        <p>{{user.phone}}</p>
      </div>
      <!-- <div class="profile-page-input-wrp">
        <client-only>
          <the-mask
            :mask="['+7 (###) ###-##-##']"
            class="profile-page-input"
            disabled
            type="tel"
            v-model="user.phone"
            required
          />
        </client-only>
        <div class="error-text" v-if="$getError('updatePhone')">{{ $getError('updatePhone') }}</div>
        <button @click="editPhone" class="profile-page-edit">Изменить</button>
      </div> -->
      <div class="profile-page-label-wrp" @click="openPassModal">
        <label class="profile-page-label">
          <lock />
          Пароль
        </label>
        <button class="profile-page-edit">Изменить</button>
      </div>
      <!-- <div class="profile-page-input-wrp">
        <input
          type="password"
          class="profile-page-input"
          v-model="oldPass"
          :disabled="togglePass"
          placeholder="*****"
        />
        <label v-if="!togglePass" class="profile-page-label">Новый пароль</label>
        <input
          v-if="!togglePass"
          v-model="pass"
          type="password"
          class="profile-page-input --new-pass"
        />
        <label v-if="!togglePass" class="profile-page-label">Повторите пароль</label>
        <input
          v-if="!togglePass"
          v-model="passc"
          type="password"
          class="profile-page-input --new-pass"
        />
        <div class="error-text" v-if="$getError('updatePassword')">{{ $getError('updatePassword') }}</div>
        <button
          class="profile-page-edit"
          @click="togglePass = !togglePass"
        >{{ togglePass ? 'Изменить' : 'Сохранить' }}</button>
      </div> -->
    </div>
    <div class="profile-info-col profile-page-block">
      <h5 class="profile-page-subtitle">Личные данные</h5>
      <div class="profile-page-input-wrp">
        <input v-model="user.name" :disabled="toggleName" type="text" class="profile-page-input" />
      </div>
      <!-- <div class="profile-page-input-wrp">
				<label class="profile-page-label">Дата рождения</label>
				<input type="text" class="profile-page-input" value="12 декабря 1990" disabled>
      </div>-->
      <!-- <div class="error-text" v-if="$getError('updateProfile')">{{ $getError('updateProfile') }}</div> -->
      <button class="button --main-color" @click="toggleName = !toggleName">
        {{ toggleName ? 'Изменить' : 'Сохранить' }}
      </button>
      <!-- <button
        class="profile-page-edit"
        @click="toggleName = !toggleName"
      >{{ toggleName ? 'Изменить личные данные' : 'Сохранить личные данные' }}</button> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import email from '@/static/icons/email-icon-base.svg'
import phone from '@/static/icons/phone-icon-base.svg'
import lock from '@/static/icons/lock.svg'
import editEmail from '@/components/profile/modals/edit-email'
import emailConfirm from '@/components/profile/modals/email-confirm'
import editPass from '@/components/profile/modals/edit-pass'
import passConfirm from '@/components/profile/modals/pass-confirm'
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
      isEmailModalOpen: false,
      isEmailConfirmOpen: false,
      isPassModalOpen: false,
      isPassConfirmOpen: false
    };
  },
  components: {
    email,
    phone,
    lock,
    editEmail,
    emailConfirm,
    editPass,
    passConfirm,
  },
  created() {
    this.user = { ...this.$getUser() };
  },
  watch: {
    togglePhone: async function(val) {
      if (val && this.user.phone != this.$getUser().phone) {
        // await this.$api.put('/user', { phone: this.user.phone }, 'updatePhone')
        await this.updateProfile({ phone: this.user.phone });
        if (!this.$getError("updatePhone")) {
          document.body.classList.add("--hidden"),
            this.$store.commit("SET_VERIFY_MODAL", this.user);
        }
      }
    },
    toggleName: async function(val) {
      if (val) {
        const res = await this.updateProfile({ name: this.user.name });
        // console.log('res', res)
      }
    },
    toggleEmail: async function(val) {
      if (val && this.user.email != this.$getUser().email) {
        await this.$api.put("/user", { login: this.user.email }, "updateEmail");
      }
    },
    togglePass: async function(val) {
      if (val) {
        if (this.pass !== this.passc) {
          this.$setError("updatePassword", "Пароли не совпадают!");
          return;
        }
        await this.updatePassword({
          password: this.oldPass,
          new_password: this.pass
        });
      }
    }
  },
  methods: {
    ...mapActions({
      updateProfile: "user/updateProfile",
      updatePassword: "user/updatePassword"
    }),
    openEmailModal() {
      this.isEmailModalOpen = true
    },
    closeEmailModal() {
      this.isEmailModalOpen = false
    },
    openEmailConfirm() {
      this.closeEmailModal()
      this.isEmailConfirmOpen = true
    }, 
    closeEmailConfirm() {
      this.isEmailConfirmOpen = false
    },  
    openPassModal() {
      this.isPassModalOpen = true
    },
    closePassModal() {
      this.isPassModalOpen = false
    },
    openPassConfirm() {
      this.closePassModal()
      this.isPassConfirmOpen = true
    },
    closePassConfirm() {
      this.isPassConfirmOpen = false
    },
    editPhone() {
      // this.togglePhone = !this.togglePhone;
      this.$store.commit("SET_PROFILE_PHONE_EDIT", true);
    },
    savePhone() {
      this.togglePhone = !this.togglePhone;
      this.$store.commit("SET_PROFILE_PHONE_MODAL", true);
    }
  }
};
</script>

<style>
</style>
