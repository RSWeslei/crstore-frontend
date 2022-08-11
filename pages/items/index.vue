<template>
  <v-app>
    <v-container fluid class="font">
      <v-row
        dense
      >
        <v-card
          v-for="(item) in items"
          :key="item.id"
          color="#12395d"
          style="margin: 10px;"
          width="300px"
          height="500px"
          :disabled="item.stock <= 0"
        >
          <v-col align="center">
            <v-card-text 
              style="font-size: 20px;"
            >{{item.name}}</v-card-text>
          </v-col>
          <v-col align="center">
            <v-img
              :src="item.image"
              width="150px"
              height="150px"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col>
            <v-card-text 
              style="font-size: 16px;"
            >
              {{item.description}}
            </v-card-text>
          </v-col>
          <v-container class="flex">
            <v-row>
              <v-col align="left">
                <v-card-text
                  style="font-size: 20px; 
                  color: green"
                >
                  R$ {{item.price}}
                </v-card-text>
              </v-col>
              <v-col align="right">
                <v-card-text
                  class="font"
                  :style="`font-size: 20px;
                  color: ${item.stock > 0 ? 'green' : 'red'}`"
                >
                  {{ item.stock > 0 ? `${item.stock} Disponível` : 'Indisponível'}}
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="flex">
            <v-row>
              <v-col align="center">
                <v-text-field
                  v-model="item.selectQtd"
                  solo
                  dense
                  type="number"       
                >c</v-text-field>
              </v-col>
              <v-col align="right">
                <v-btn
                  color="green"
                  dense
                  solo
                  @click="addToCart(item)"   
                >Add to cart</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created () {
    this.getItems()
  },
  data () {
    return{
      items: [ { selectQtd: 0 } ]
    }
  },
  methods: {
    async getItems (){
      try {
        let response = await this.$api.get(`/items`)
        this.items = response.data
        this.items.forEach(item => {
          item.selectQtd = 0
        })
      } catch (error) {
        this.$toast.error(`Erro ao buscar produtos`);
      }
    },
    async addToCart (item) {
      try {
        if (item.selectQtd <= 0){
          return this.$toast.error(`Quantidade invalida!`);
        }
        if (item.stock - item.selectQtd < 0){
          return this.$toast.error(`Quantidade não disponível!`);
        }
        let response = await this.$api.post('/users/persistCart', {
          itemId: item.id,
          quantity: Number(item.selectQtd),
          image: item.image,
          name: item.name
        })
        if (response.type == 'sucess') {
          return this.$toast.success(`${response.message}`);
        }
        else if (response.type == 'error') {
          return this.$toast.error(`${response.message}`);
        }
      } catch (error) {
        this.$toast.error(`Erro ao adicionar ao carinho!`);
      }
    }
  }
}
</script>

<style>

</style>