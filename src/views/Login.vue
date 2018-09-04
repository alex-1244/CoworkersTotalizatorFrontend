<template>
    <div>
        <form v-on:input.prevent="onFormChange">
            <div>
                <div class="input-ctrl">
                    <input v-model="localUserEmail" type="text" placeholder="Login name"/>
                </div>
                <div class="input-ctrl">
                    <input v-model="localPassword" type="password" placeholder="Password"/>
                </div>
                <div>
                    <input v-on:click="login" type="submit" />
                </div>
            </div>
            <div class="error" v-if="localError">
                {{ localError }}
            </div>
        </form>
    </div>
</template>

<script>
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
    };
  },
  methods: {
    login: function login() {
      if (this.localUserEmail === 'user' && this.localPassword === 'pwd') {
        this.$store.commit('login_succeeded', 'tokentoken');
        this.localError = null;
        this.$router.push({ name: 'dataProviders' });
      } else {
        this.localError = 'User name or password is incorrect';
      }
    },
    onFormChange: function onFormChange() {
      this.localError = null;
    },
  },
};
</script>

<style lang="less">
.input-ctrl {
  margin-bottom: 10px;
}
</style>
