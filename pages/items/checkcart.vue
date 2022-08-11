<template>
  <v-app class="font">
    <v-container v-if="cartItems.length > 0">
      <v-card 
        color="#1d5c96"
      >
        <v-col>
          <v-row 
            v-for="item in cartItems"
            :key="item.itemId"
            style="margin: 10px;"
          >
            <v-card class="flex" color="#12395d">
              <v-container>
                <v-row align="center">
                  <v-col align="center">
                    <v-img
                      width="100px"
                      height="100px"
                      :src="item.image"
                      class="rounded-lg"
                    ></v-img>
                  </v-col>
                  <v-col>
                    <v-card-text
                      style="font-size: 20px;"  
                    >
                      {{item.name}}
                    </v-card-text>
                  </v-col>
                  <v-col>
                    <v-container>
                      <v-row align="center">
                        <v-col>
                          <v-text-field
                            v-model="item.savedQtd"
                            type="number"
                            solo
                            style="width: 100px"  
                          ></v-text-field>
                          <v-btn
                            color="red"
                            small
                            @click="deleteItem(item.itemId)"
                          >
                            Deletar
                          </v-btn>
                          <v-btn
                            v-if="item.quantity != item.savedQtd"
                            color="blue"
                            small
                            @click="updateItem(item)"
                          >
                            Atualizar
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col>
                    <v-container>
                      <v-card-text
                        style="color: green;font-size: 20px;"
                      >
                        R$ {{(item.price * item.savedQtd).toFixed(2)}}
                      </v-card-text>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-row>
          <v-col>
            <v-card class="flex" color="#12395d">
              <v-container>
                <v-row align="center">
                  <v-col align="left">
                    <v-card-text
                      style="color: green; font-size: 20px;"
                    >
                      Valor total: R$ {{totalPrice.toFixed(2)}}
                    </v-card-text>
                  </v-col>
                  <v-col align="right" style="font-size: 20px;" >
                    <v-btn
                      color="green"
                      @click="checkout()"
                      to="checkout"
                    >Finalizar a compra</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-col>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-alert
        border="top"
        color="red"
        dark
        style="font-size: 20px;"
      >
        O seu carrinho está vazio 🗿
      </v-alert>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created () {
    this.getItems()
  },
  data () {
    return {
      cartItems: [],
      totalPrice: 0.00
    }
  },
  methods: {
    async getItems () {
      let items = await this.$api.get('/users/cartItems')
      for (const item of items.data) {
        let itemPrice = await this.$api.get(`/items/price/${item.itemId}`)
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
    async deleteItem (id) {
      try {
        if (!confirm('Deseja deletar o item?')){
          return
        }
        await this.$api.post('/users/persistCart', {
          id: id
        })
        this.$toast.success(`Produto removido com sucesso!`);
        await this.getItems()
      } catch (error) {
        this.$toast.error(`Erro ao remover o produto!`);
      }
    },
    async calculateTotalPrice () {
        for (const cart of this.cartItems) {
          this.totalPrice += cart.price * cart.quantity
        }
    },
    async updateItem (item) {
      try {
        if (item.savedQtd <= 0){
          item.savedQtd = item.quantity
          return this.$toast.error(`Quantidade invalida!`);
        }
        let itemDb = await this.$api.get(`/items/${item.itemId}`)
        if (itemDb && itemDb.data.stock < item.savedQtd){
          item.savedQtd = item.quantity
          return this.$toast.error(`Quantidade indisponivel!`);
        }
        await this.$api.post('/users/persistCart', {
          itemId: item.itemId,
          quantity: Number(item.quantity),
          image: item.image,
          name: item.name,
          type: 'merge',
          savedQtd: item.savedQtd
        })
        await this.getItems()
        this.$toast.success(`Produto atualizado com sucesso!!`);
      } catch (error) {
        this.$toast.error(`Erro ao atualizar o produto!`);
      }
    },
    async checkout () {
      try {
        
      } catch (error) {
        this.$toast.error(`Erro ao finalizar o pedido!`);
      }
    }
  },
}
</script>

<style>
  
</style>