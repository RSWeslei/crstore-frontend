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
            :src="'https://picsum.photos/200/' + item.id + '00'"
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
                value="0"
                style="width: 70%;"
                solo
                dense
                type="number"       
              >c</v-text-field>
            </v-col>
            <v-col>
              <v-btn
                style="width: 70%;"
                color="green"
                dense
                solo        
              >Comprar</v-btn>
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
          category: null
        }
      ]
    }
  },
  methods: {
    async getItems (){
      try {
        let response = await this.$api.$get(`/items`)
        this.items = response.data
        console.log(JSON.stringify(this.items));
      } catch (error) {
        
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