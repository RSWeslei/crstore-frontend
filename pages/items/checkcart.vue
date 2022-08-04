<template>
  <v-container style="padding-left: 200px;">
    <v-card
      class="d-flex"   
      color="#242635"  
    >
      <v-col>
        <v-row 
          v-for="item in items"
          :key="item.id"
          style="margin: 10px;"
        >
          <v-card class="flex">
            <v-container>
              <v-row align="center">
                <v-col>
                  <v-img
                    width="100px"
                    src="https://picsum.photos/200/200"
                    class="rounded-lg"
                  ></v-img>
                </v-col>
                <v-col>
                  <v-card-text>{{item.name}}</v-card-text>
                </v-col>
                <v-col>
                  <v-container>
                    <v-row align="center" style="background-color: red;">
                      <v-col>
                        <v-btn 
                          fab
                          small
                        >+</v-btn>
                      </v-col>
                      <v-col>
                        <v-text-field
                          type="number"
                          solo
                          style="width: 80px; padding-top: 30px;"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn 
                          fab
                          small
                        >-</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
export default {
  created () {
    this.getItems()
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getItems () {
      let response = await this.$api.$get('/items')
      this.items = response.data
    }
  }
}
</script>

<style>

</style>