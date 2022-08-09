<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-text
              style="font-size: 20px;"
            >Endereços:</v-card-text>
            <v-card>
              <v-card>
                <v-card-text
                  v-for="(address, index) in addresses"
                  :key="address.id"   
                >
                  <v-checkbox
                    :label="`Endereço ${index+1}`"
                  >
                  </v-checkbox>
                  <v-card-text>
                    {{`Endereço: ${address.address}`}}
                  </v-card-text>
                  <v-card-text>
                    {{`Cidade: ${address.city}`}}
                  </v-card-text>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col>
            <v-card-text
              style="font-size: 20px;"
            >Pagamento:</v-card-text>
            <v-card>
              <v-card-text>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  created () {
    this.getAddresses()
  },
  data () {
    return{
      addresses: []
    }
  },
  methods: {
    async getAddresses () {
      let response = await this.$api.$get('/addresses')
      this.addresses = response.data
      console.log(response.data);
    }
  }
}
</script>

<style>

</style>