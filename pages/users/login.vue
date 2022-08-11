<template>
  <v-app>
    <v-container fluid fill-height style="width: 400%;">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-form v-model="valid">
              <v-col>
                <v-text-field
                  v-model="user.username"
                  outlined
                  clearable
                  label="Username"
                  type="text"
                  :rules="[rules.required]"
                  required
                >
                  <template v-slot:append>
                    <img
                      width="24"
                      height="24"
                      src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                      alt=""
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="user.password"
                  outlined
                  required
                  clearable
                  label="Password"
                  type="password"
                  :rules="[rules.required]"
                >
                  <template v-slot:append>
                    <img
                      width="24"
                      height="24"
                      src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                      alt=""
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col align="center">
                  <v-btn
                  color="blue"
                  @click="login()"
                >
                  Login
                </v-btn>
              </v-col>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      user: {   
        username: null,
        password: "",
      },
      rules: {
          required: value => !!value || 'Field required',
        },
      valid: false
    }
  },
  methods: {
    async login () {
      try {
        if (!this.valid){
          return this.$toast.warning('You need fill all fields correct!');
        }
        console.log(JSON.stringify(this.user));
        let response = await this.$axios.$post(`http://localhost:3333/users/login`, this.user)
        if (response.type == 'success'){
          localStorage.removeItem('crstore-api-token')
          localStorage.setItem('crstore-api-token', response.token)
          this.$toast.success(`Login feito com sucesso!`);
          location.reload()
          this.$router.push('../items');
        }
        else {
          return this.$toast.warning(`${response.message}`);
        }
      } catch (error) {
        return this.$toast.error(`${error.message}`);
      }
    }
  }
}
</script>

<style>

</style>