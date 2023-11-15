<template>
  <div class="footer" ref="footer">
    <div class="copyright">
      <div>
        © 2022 <br v-if="getWidth <= 390" />
        Babich Dmitriy
      </div>
      <div class="phone">375 (29) 589-02-91</div>
    </div>
    <div class="messangers">
      <a
        href="https://www.instagram.com/l3.dima/"
        target="_blank"
        class="instagram"
        ><i class="fab fa-instagram"></i
      ></a>
      <a href="https://t.me/l3Dima" target="_blank" class="telegram"
        ><i class="fab fa-telegram-plane"></i
      ></a>
      <a href="https://twitter.com/BabicDmitrij" target="_blank" class="twitter"
        ><i class="fab fa-twitter"></i
      ></a>
      <a href="https://vk.com/l3_dima" target="_blank" class="vk"
        ><i class="fab fa-vk"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getWidth() {
      return window.screen.width;
    },
  },
};
</script>

<style>
.footer {
  font-family: "Source Sans Pro", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  width: 100%;
  /* background-color: #0c0d0d; */
  z-index: 3;
  backdrop-filter: blur(12px);
  flex-grow: 0;
}

.copyright {
  /* color: #fff; */
  color: #000;
  font-weight: 600;
  margin-right: 45px;
  display: flex;
  flex-direction: column;
}

.messangers {
  font-size: 1.35em;
  display: flex;
}

.messangers > a {
  text-decoration: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition-duration: 0.2s;
  color: #000;
  margin: 0 10px;
  font-weight: 600;
}

.phone {
  margin-top: 0.15rem;
  font-size: 0.8rem;
}

.instagram:hover {
  color: white;
  background: #f09433;
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
}

.telegram:hover {
  color: white;
  background: #0088cc;
}

.twitter:hover {
  color: white;
  background: #1d9bf0;
}

.vk:hover {
  color: white;
  background: #0077ff;
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
  .footer {
    justify-content: space-between;
    padding: 22px;
  }

  .copyright {
    margin-right: 0;
  }
}
/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .footer {
    padding: 22px 12px;
  }

  .copyright {
    font-size: 0.9em;
  }

  .messangers {
    font-size: 1.2em;
  }

  .messangers > a {
    margin: 0 6px;
  }
}

/*# sourceMappingURL=adaptive.css.map */
</style>
