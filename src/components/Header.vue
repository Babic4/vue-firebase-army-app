<template>
  <div class="header" ref="header">
    <div ref="logo" class="logo" :style="{ color: getColor }">
      {{ isLogin ? getColor : "#e36858" }}
    </div>
    <button v-if="!isLogin" class="btn-login" @click="signIn">Sign In</button>
    <div v-else class="auth-box">
      <img
        class="avatar"
        :style="{ outline: '3px solid ' + getColor }"
        :src="user.photoURL"
        alt="avatar"
      />
      <button class="btn-exit" @click="logOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/firebase";
import { useColors } from "@/firebase";

export default {
  setup() {
    const { user, isLogin, signIn, logOut } = useAuth();
    const { colors } = useColors();

    return {
      user,
      isLogin,
      signIn,
      logOut,
      colors,
    };
  },
  methods: {
    handleScroll() {
      if (
        window.scrollY + window.innerHeight + 2 >=
        document.body.scrollHeight
      ) {
        this.$refs.header.style.transform = "scale(0.97)";
      } else {
        this.$refs.header.style.transform = "scale(1)";
      }
    },
  },
  computed: {
    getColor() {
      if (this.isLogin) {
        let color = "";
        this.colors.forEach((element) => {
          if (element.userId == this.user.uid) {
            color = element.color;
            return;
          }
        });
        return color;
      } else return "#e36858";
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgba(12, 13, 13, 0.6);
  z-index: 3;
  backdrop-filter: blur(12px);
  padding: 20px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 0;
  transition-duration: 0.4s;
}

.logo {
  font-family: "Audiowide", cursive;
  /* color: #e36858; */
  font-size: 1.5em;
}

.btn-login {
  cursor: pointer;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1em;
  color: hsl(0, 0%, 100%);
  padding: 10px 12px;
  background-color: transparent;
  border: none;
  outline: none;
}

.btn-login:hover {
  background-color: #e36858;
  border-radius: 10px;
}

.btn-exit {
  cursor: pointer;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1em;
  color: white;
  padding: 10px 12px;
  background-color: transparent;
  border: none;
  outline: none;
}

.btn-exit:hover {
  /* background-color: #e51919; */
  background-color: #e36858;
  border-radius: 10px;
}

.auth-box {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 12px;
}

/* -------------------------  adaptive  -------------------------- */
/*==========  Desktop First  ========== */
/* Large Devices, Wide Screens */
@media only screen and (max-width: 1200px) {
  /* */
}
/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) {
  /* */
}
/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .header {
    padding: 20px 22px;
  }

  .logo {
    font-size: 1.2em;
  }
}
/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .header {
    padding: 16px 12px;
  }
}

/*# sourceMappingURL=adaptive.css.map */
</style>
