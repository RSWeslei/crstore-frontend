<template>
  <div
    style="padding-left: 35%;"
  >
    <v-card
      width="60%"
      height="600px"
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
                v-model="user.name"
                outlined
                clearable
                label="Full name"
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
                v-model="user.phone"
                outlined
                clearable
                label="Phone"
                type="telephone"
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
                :rules="[rules.required, rules.min]"
                
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
                v-model="user.cpf"
                required
                :rules="[rules.required]"
                outlined
                clearable
                label="CPF"
                type="text"
                v-mask="['###.###.###-##']"
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
                @click="register"
              >
                Create
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
        name: null,
        phone: null,
        password: "",
        cpf: null
      },
      rules: {
          required: value => !!value || 'Field required',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      valid: false
    }
  },
  methods: {
    async register () {
      try {
        if (!this.valid){
          return this.$toast.warning('You need fill all fields correct!');
        }
        console.log(JSON.stringify(this.user));
        let response = await this.$axios.$post(`http://localhost:3333/users/register`, this.user)
        if (response.type == 'success'){
          this.$toast.success(`Account created with sucess!`);
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