<template>
  <v-app class="font"
    fluid
  >
    <v-navigation-drawer 
      v-model="drawer"
      app
      fixed
      style="background-color: #12395d;"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item
            to="/"
            class="flex"
            style="padding-top: 10%;
              padding-left: 10%;"
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
        </v-list>
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
    <v-app-bar 
      app
      fixed
      color="#12395d"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
        <v-btn
          style="margin-left: 10px;"
          v-for="btn in isLogged ? loggedBtns : defaultBtns"
          :key="btn.title"
          :text="btn.title ? true : false"
          :icon="btn.icon ? true : false"
          :to="btn.to"
          fab
        >
          <v-icon>{{btn.icon ? btn.icon : btn.title}}</v-icon>
        </v-btn>
    </v-app-bar>
    <v-main>
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
        drawer: true,
        isLogged: false,
        loggedBtns: [
          {
            title: null,
            to: "/items/checkcart",
            type: 'icon',
            icon: 'mdi-cart'
          },
          {
            title: 'Logout',
            to: "/users/login",
            type: 'text',
            icon: null
          }
        ],
        defaultBtns: [
          {
            title: 'Entrar',
            to: "/users/login",
            type: 'text',
            icon: null
          },
          {
            title: 'Cadastro',
            to: "/users/signup",
            type: 'text',
            icon: null
          }
        ]
      }
    },
    async created () {
      await this.validateLogin();
    },
    methods: {
      async validateLogin () {
        const token = localStorage.getItem('crstore-api-token') || '';
        let response = await this.$api.get('/users/validate-token', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.message);
        this.isLogged = response.data
      }
    }
  }
</script> 

<style>
  @import url('https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap');
  .font {
    font-family: 'Mouse Memoirs', sans-serif;
  }
  .primary-color {
    color: #242635;
  }
  
</style>
