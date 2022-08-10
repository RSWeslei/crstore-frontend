<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-text
              style="font-size: 20px;"
            >Endereços:</v-card-text>
            <v-card color="#12395d">
              <v-container>
                <v-card style="margin: 10px">
                  <v-list align=left>
                    <v-list-item
                      v-for="(address, index) in addresses"
                      :key="address.id"
                    >
                      <v-btn
                        @click="selectAddress(address, index)"
                        :color="`${selectedAddress == index ? 'green' : ''}`"
                      >{{`Endereço ${index+1}`}}</v-btn>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-card v-if="address.zipcode">
                  <v-container>
                    <v-textarea
                      solo
                      disabled
                      auto-grow
                      :value="`Endereço: ${address.address}\nCidade: ${address.city}\nRua: ${address.street}\nNúmero: ${address.number}\nCEP: ${address.zipcode}`"   
                    >
                    </v-textarea>
                  </v-container>
                </v-card>
              </v-container>
            </v-card>
          </v-col>
          <v-col>
            <v-card-text
              style="font-size: 20px;"
            >Pagamento:</v-card-text>
            <v-card color="#12395d">
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn
                      :color="`${paymentMethod == 1 ? '#32CD32' : ''}` "
                      @click="selectPayment(1)"
                    >Dinheiro</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :color="`${paymentMethod == 2 ? '#32CD32' : ''}` "
                      @click="selectPayment(2)"
                    >PIX</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      :color="`${paymentMethod == 3 ? '#32CD32' : ''}` "
                      @click="selectPayment(3)"
                    >Cartão de crédito</v-btn>
                  </v-col>
                </v-row>
                <v-col>
                  <v-card v-if="paymentMethod == 1">
                    <v-card-text
                      style="font-size: 20px;"
                    >
                      Se resolva com o motoca
                    </v-card-text>
                  </v-card>
                  <v-card v-if="paymentMethod == 2">
                    <v-container>
                      <v-img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png"
                      ></v-img>
                    </v-container>
                  </v-card>
                  <v-card v-if="paymentMethod == 3">
                    <v-container>
                       <v-text-field
                        type="text"
                        solo
                        label="Nome do titular"
                        append-icon="mdi-account"
                      ></v-text-field>
                      <v-text-field
                        type="text"
                        solo
                        label="Numero do cartão"
                        append-icon="mdi-credit-card"
                        v-mask="['#### #### #### ####']"
                      ></v-text-field>
                      <v-row>
                        <v-col>
                          <v-text-field
                            type="text"
                            solo
                            label="MM/DD"
                            append-icon="mdi-calendar"
                            v-mask="['##/##']"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            type="text"
                            solo
                            label="CVC"
                            append-icon="mdi-key"
                            v-mask="['###']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-container>
            </v-card>  
          </v-col>
          <v-col>
            <v-card-text
              style="font-size: 20px;"
            >Finalizar:</v-card-text>
            <v-card color="#12395d">
              <v-container>
                <v-card-text style="font-size: 20px; color: green">
                  Valor total: R$ {{totalPrice.toFixed(2)}}
                </v-card-text>
                <v-col align="center">
                  <v-btn 
                    color="green"
                    @click="doOrder()"
                  >Finalizar compra</v-btn>
                </v-col>
              </v-container>
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
    this.getItems()
  },
  data () {
    
    return{
      addresses: [],
      address: {},
      cartItems: [],
      // creditCard: {},
      paymentMethod: 0, //'money = 1', 'pix = 2', 'creditCard = 3'
      selectedAddress: -1,
      totalPrice: 0.00
    }
  },
  methods: {
    async getAddresses () {
      let response = await this.$api.$get('/addresses')
      this.addresses = response.data
      console.log(response.data);
    },
    selectPayment (type) {
      if (this.paymentMethod == type){
        this.paymentMethod = 0
        return
      }
      this.paymentMethod = type
    },
    selectAddress (address, index) {
      if (address.id == this.address?.id){
        this.address = {}
        return
      }
      this.address = address
      this.selectedAddress = index
    },
    async doOrder () {
      try {
        if (!this.address?.zipcode){
          return this.$toast.warning(`Selecione um endereço!`);
        }
        if (![1, 2, 3].includes(this.paymentMethod)){
          return this.$toast.warning(`Selecione um tipo de pagamento!`);
        }
        
        let response = await this.$api.$post('/orders/persist', {
          totalPrice: this.totalPrice,
          coupon: null,
          idPaymentMethod: this.paymentMethod
        })
        console.log(response.message);
      } catch (error) {
        return this.$toast.error(`Erro ao finalizar o pedido!`);
      }
    },
    async getItems () {
      let items = await this.$api.$get('/users/cartItems')
      for (const item of items.data) {
        let itemPrice = await this.$api.$get(`/items/price/${item.itemId}`)
        item.price = itemPrice.data
        item.savedQtd = item.quantity
      }
      this.cartItems = items.data
      this.totalPrice = 0.00
      await this.calculateTotalPrice()
      if (items.type == 'error') {
        return this.$toast.error(`${items.message}`);
      }
    },
    async calculateTotalPrice () {
      for (const cart of this.cartItems) {
        this.totalPrice += cart.price * cart.quantity
      }
    },
  }
}
</script>

<style>

</style>