<template>
    <div>
        <form @submit="login">
            <div>
                <div class="input-ctrl">
                    <input v-model="localUserEmail" type="text" placeholder="Login name"/>
                </div>
                <transition name="showPassword">
                    <div class="input-ctrl" v-if="showPassword">
                        <input v-model="localPassword" type="password" placeholder="Password"/>
                    </div>
                </transition>
                <div>
                    <input type="submit" />
                </div>
            </div>
            <div class="error" v-if="localError">
                {{ localError }}
            </div>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'login',
  props: {
    userEmail: String,
    error: String,
  },
  data: function loginData() {
    return {
      localUserEmail: this.userEmail,
      localPassword: this.password,
      localError: this.error,
      showPassword: false,
    };
  },
  methods: {
    login: function login() {
      if (!this.showPassword) {
        api
          .post(
            '/api/login/login',
            `"${this.localUserEmail}"`,
          )
          .then(() => {
            this.showPassword = true;
          });
      } else if (this.localPassword) {
        this.validateToken(this.localPassword).then((userRole) => {
          this.$store.commit('loginSuccess', this.localPassword);
          this.$store.commit('userRoleSet', userRole);
          this.$router.push({ name: 'Coworkers' });
        });
      }
    },
    onFormChange: function onFormChange() {
      this.localError = null;
    },
    validateToken: function validateToken(token) {
      return api.post(
        '/api/login/validate',
        `"${token}"`,
      );
    },
  },
};
</script>

<style lang="less">
.input-ctrl {
  margin-bottom: 10px;
}
</style>
