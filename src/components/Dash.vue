<template>
  <div :class="['wrapper', classes]">
    <edit-password-modal
      v-if="showEditPasswordModal"
      @editPasswordOk="showEditPasswordModal = false"
      @close="showEditPasswordModal = false">
    </edit-password-modal>

    <header class="main-header">
	<!-- <span class="logo-mini">
		<a href="/"><img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block logo"></a>
	</span> -->
      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <span class=" white right-space top-space">欢迎您：{{ demo.displayName }}</span>
            <a @click="modifyPassword" class="white top-space right-space">[修改密码]</a>
            <a @click="logout" class="white top-space">[退出系统]</a>        
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar/>
  
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="javascript:;">
              <i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>
  
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->
  
    <!-- Main Footer -->
    <!-- <footer class="main-footer">
      <strong>Copyright &copy; {{year}}
        <a href="javascript:;">CoPilot</a>.</strong> All rights reserved.
    </footer> -->
  </div>
  <!-- ./wrapper -->
</template>

<script>
// import faker from 'faker'
import { mapState } from 'vuex'
import config from '../config'
import Sidebar from './Sidebar'
import store from '../store'
import auth from '../auth'
import EditPasswordModal from './views/EditPasswordModal'
// import { subDomain } from '../../config/deploy.env'
// import 'hideseek'

export default {
  name: 'Dash',
  components: {
    Sidebar,
    EditPasswordModal
  },
  data: function () {
    return {
      // section: 'Dash',
      // year: new Date().getFullYear(),
      showEditPasswordModal: false,
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    demo () {
      return {
        displayName: store.state.userName
        // avatar: faker.image.avatar(),
        // email: faker.internet.email(),
        // randomCard: faker.helpers.createCard()
      }
    }
  },
  methods: {
    modifyPassword () {
      this.showEditPasswordModal = true
    },
    logout () {
      auth.clearAuthInfo()
      this.$router.push({name: '登录'}) // subDomain + '/login')
      this.$router.refresh()
    }
    // changeloading () {
    //   this.$store.commit('TOGGLE_SEARCHING')
    // }
  }
}
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini,
.logo-lg {
  text-align: left;

  img {
    padding: .4em !important;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}

.white {
  color: #fff;
}

.top-space {
  margin-top: 10px;
}

.right-space {
  margin-right: 15px;
}
</style>
