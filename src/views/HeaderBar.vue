<template>
  <div>
    <Slide
      left
      isOpen
      noOverlay
      disableEsc
      disableOutsideClick
      :burgerIcon="false"
      :crossIcon="false"
    >
    <b-link class="navbar-brand flex-start brand-name" :to="{name: 'home'}" >{{brandName}}</b-link>
    <template v-for="item in menu" >
      <b-link :to="item.navigate" :title="item.title" :class="item.class" :key="item.id">{{item.display}}</b-link>
    </template>
      <!-- <b-link
        class="navbar-brand flex-start brand-name"
        :to=""
      >{{brandName}}</b-link>
        <b-link :to="{name: 'productManagement'}" :title="$t('productManagement')">{{$t('product')}}</b-link>
        <a :href="'./a'" :title="$t('orderManagement')">{{$t('orders')}}</a>
        <a :href="'./b'" :title="$t('categoryManagement')">{{$t('category')}}</a>
        <b-link :to="{name: 'preview'}" :title="$t('preview')">{{$t('preview')}}</b-link> -->
    </Slide>
    <nav class="navbar navbar-light bg-light flex saving-users">
      <div class="col-sm-3 title-management">
          <h2 class="flex">{{$t(title)}}</h2>
        </div>
      <!-- <search-input
        :placeholder="'Tìm kiếm'"
        @searchValue="searchAction"
        class="col-sm-8 margin-auto"
      /> -->
    </nav>
    <hr class="nav-line-under" />
  </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
import { loginHanlder } from '../mixins/LoginHandler'
export default {
  components: { Slide },
  data () {
    return {
      showProfile: false,
      brandName: 'TheCoffee',
      currentLink: location.href,
      menu: [
        // {
        //   id: 0,
        //   class: 'navbar-brand flex-start brand-name',
        //   navigate: { name: 'home' }, // this.$router.resolve({ name: 'home' }).href,
        //   title: '',
        //   display: this.brandName
        // },
        {
          id: 1,
          class: '',
          navigate: { name: 'productManagement' },
          title: this.$t('productManagement'),
          display: this.$t('product')
        },
        {
          id: 2,
          class: '',
          navigate: { name: 'orderManagement' },
          title: this.$t('orderManagement'),
          display: this.$t('orders')
        },
        {
          id: 3,
          class: '',
          navigate: { name: 'categoryManagement' },
          title: this.$t('categoryManagement'),
          display: this.$t('category')
        },
        {
          id: 4,
          class: '',
          navigate: { name: 'preview' },
          title: this.$t('preview'),
          display: this.$t('preview')
        }
      ]
    }
  },
  created () {
    console.log('reload')
  },
  computed: {
    isLogin () {
      return this.$store.state.login.isLogin
    },
    userName () {
      let json = atob(this.$store.state.login.user)
      let userName = !json ? '' : json // JSON.parse(json).username
      return userName
    },
    title () {
      return this.$store.state.header.title
    }
  },
  methods: {
    searchAction (value) {
      console.log(value)
      this.$store.commit('updateSearchValue', value)
    },
    signOut () {
      loginHanlder.signOutUser()
    }
  }
}
</script>
<style lang="scss">
#nav-bar {
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.form-inline {
  margin: auto;
}

.brand-name {
  color: white;
  font-size: 2em;
  font-family: initial;
  padding: 0;
  margin-bottom: 1.4rem;
}

.brand-name:hover {
  color: white;
  text-decoration: none;
  border: none !important;
}

.border-bottom {
  border-bottom: 0.5em;
}

.headerbar-custom {
  .headerbar-custom_right {
    li {
      margin: auto;
    }
  }
}

.nav-font-size {
  font-size: 1.5em;
  a {
    opacity: 0.6;
    transition: 0.3s;
    text-decoration: none;
  }
  a:hover {
    opacity: 1;
    color: rgb(88, 91, 117);
  }
}

.header-link {
  width: 80%;
  margin: auto;
  a {
    margin: auto;
  }
}

.nav-font-active {
  color: aqua;
  text-decoration: underline overline;
}

.nav-line-under {
  margin-top: 0;
  border-top: 2px solid #2e2c2bfd;
  margin-left: 15px;
  margin-right: 15px;
}

.popover-body {
  a,
  button {
    font-size: 12.5pt;
  }
}

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #373a47;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: #373c50; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;

  a {
    display: flex;
    text-decoration: none;
    color: white;
  }

  a:hover {
    border-left: 3px solid red;
  }
  a:active {
    border-left: 3px solid red;
  }
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
</style>
