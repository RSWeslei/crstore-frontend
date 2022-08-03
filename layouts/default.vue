<template>
  <v-app
    fluid
    style="background-color: #181B24;"
  >
    <v-navigation-drawer
      absolute
      permanent
      style="background-color: #242635; width: 15%; height: 100%"
    >
      <template v-slot:prepend>
          <v-list-item
            to="/"
            class="flex"
            style="padding-top: 10%;
              padding-left: 10%;
            "
          >
          <v-list-item-avatar>
            <img src="../assets/icons/main-icon.jpeg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              style="
                font-family: 'Lucida Sans';
                color: #EB392E;
                font-size: x-large;
              "
            >
              CrStore
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          style="font-family: 'Lucida Sans';
            padding-left: 10%;
            padding-top: 15%;
            font-size: medium;
          "
          >
            MENU
        </v-list-item>
        <v-list
          dense
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main app style="width: 100%;">
      <div 
        style="width: 100%;
          padding-top: 15px;
          padding-right: 15px;"
          class="text-right"
      >
        <div class="my-1">
          <v-btn
            color="#31CED9"
            fab
            to="/users/signup"
          >
            <v-icon size="300%">mdi-account-circle</v-icon>
          </v-btn>
        </div>

      </div>
        <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { 
            title: 'Products',
            icon: 'mdi-hand-okay',
            to: "/items"
          },
          { title: 'About', icon: 'mdi-forum' },
        ],
      }
    },
    methods: {
      
    }
  }
</script> 

<style>

</style>
