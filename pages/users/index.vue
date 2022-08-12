<template>
  <v-app>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-card-text>
              Usuário: {{user.username}}
            </v-card-text>
            <v-card-text>
              Nome completo: {{user.name}}
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-container>
            <v-card-text>
              Pedidos
            </v-card-text>
            <v-card
              v-for="order in orders"
              :key="order.id"
            >
              1
            </v-card>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  created () {
    this.getUser(),
    this.getUserOrders()
  },
  data () {
    return {
      user: {},
      orders: []
    }
  },
  methods: {
    async getUser() {
      try {
        let response = await this.$api.get('/users/')
        this.user = response.data
        if (response.type == 'error'){
          return this.$toast.error(`${response.message}`);
        }
        this.$toast.success(`${response.message}`);
      } catch (error) {
        this.$toast.error(`Erro ao buscar o usuário`);
      }
    },
    async getUserOrders() {
      try {
        let response = await this.$api.get('/orders/')
        this.orders = response.data
        if (response.type == 'error'){
          return this.$toast.error(`${response.message}`);
        }
        this.$toast.success(`${response.message}`);
      } catch (error) {
        this.$toast.error(`Erro ao buscar os pedidos`);
      }
    }
  }
}
</script>

<style>

</style>