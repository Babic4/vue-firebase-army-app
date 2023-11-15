<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&family=Source+Sans+Pro:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
}

body {
  overflow-anchor: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  transition-duration: 0.2s;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
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
  /* */
}
/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  /* */
}

/*# sourceMappingURL=adaptive.css.map */
</style>
