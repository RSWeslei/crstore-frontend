<template>
  <div
    style="padding-left: 35%;"
  >
    <v-card
      width="60%"
      height="300px"
    >
      <v-form v-model="valid"> 
        <v-container>
          <v-row>
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col 
              style="padding-left: 40%;
              padding-top: 0px;"
            >
              <v-btn
                color="blue"
                @click="login"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
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
          this.$toast.success(`Login feito com sucesso!`);
          return this.$router.push('/');
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