<template>
  <div
    style="padding-left: 15%;"
  >
    <v-container>
      <v-row
        style="margin-left: 10px;"
      >
        <v-card
          v-for="(item) in items"
          :key="item.id"
          color="#242635"
          style="margin: 10px;"
          width="250px"
          height="500px" 
        >
          <v-col align="center">
            <p 
              style="
                font-size: 20px;
              "
            >{{item.name}}</p>

          </v-col>
          <v-img
            :src="item.image"
            width="150px"
            height="150px"
            class="rounded-lg"
            style="margin-left: 20%;"
          ></v-img>
          <div
            style="padding-left: 20px;
            padding-top: 10px;"
          >
            <v-row>
              <v-card-text 
                class="font" 
                style="font-size: 16px;"
              >
                {{item.description}}
              </v-card-text>
            </v-row>
            <v-row>
              <v-col align="right">
                <p
                  style="font-size: 20px;
                  color: green"
                >
                  R$ {{item.price}}
                </p>
              </v-col>
              <v-col align="left">
                <p
                  class="font"
                  style="font-size: 20px;
                  color: green"
                >
                  {{item.stock}} {{ item.stock > 0 ? 'Disponível' : 'Indisponível'}}
                </p>
              </v-col>
            </v-row>
          </div>
          <v-col align="center">
            <v-select
              :items="item.flavors"
              item-color="green"
              label="Sabor"
              dense
              solo
              style="width: 80%;"
            ></v-select>
          </v-col>
          <v-row>
            <v-col align="center">
              <v-text-field
                :value="item.selectQtd"
                v-model="item.selectQtd"
                style="width: 60%;"
                solo
                dense
                type="number"       
              >c</v-text-field>
            </v-col>
            <v-col>
              <v-btn
                style="width: 80%;"
                color="green"
                dense
                solo
                @click="addToCart(item)"   
              >Add to cart</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  created () {
    this.getItems()
  },
  data () {
    return{
      items: 
      [
        {
          id: null,
          name: null,
          price: null,
          flavors: [],
          image: null,
          description: null,
          stock: null,
          category: null,
          selectQtd: 0
        }
      ]
    }
  },
  methods: {
    async getItems (){
      try {
        let response = await this.$api.$get(`/items`)
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
        let response = await this.$api.$post('/users/persistCart', {
          itemId: item.id,
          quantity: Number(item.selectQtd)
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
  @import url('https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap');
  .font {
    font-family: 'Mouse Memoirs', sans-serif;
  }
</style>