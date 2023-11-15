<template>
  <div class="comment" :class="sender ? 'flex-row-reverse' : ''">
    <div class="wd-85" :class="sender ? 'flex-row-reverse' : ''">
      <div>
        <img
          :src="data.userPhotoURL"
          alt="avatar"
          :class="sender ? 'left' : 'right'"
        />
      </div>
      <div class="comment-box">
        <div class="info" v-if="!sender">
          <div class="name" :style="{ color: getColor }">
            {{ data.userName }}
          </div>
        </div>
        <div
          class="message"
          :style="{
            background: sender ? getColor : '#b7b9a8',
            color: sender ? getColorText : '#000',
          }"
        >
          {{ data.text }}
        </div>
      </div>
    </div>
    <div
      class="time"
      :class="sender ? 'tm-sender' : 'tm'"
      v-html="date.replace(/, /gi, '<br>')"
    ></div>
  </div>
</template>

<script>
import { useAuth } from "@/firebase";
import { useColors } from "@/firebase";

import Color from "color";

export default {
  data() {
    return {
      date: new Date(this.data.datetime).toLocaleString("ru", {
        hour12: false,
      }),
    };
  },
  props: ["data", "sender"],
  setup() {
    const { isLogin } = useAuth();
    const { colors } = useColors();
    return { colors, isLogin };
  },
  computed: {
    getColor() {
      let color = "";
      this.colors.forEach((element) => {
        if (element.userId == this.data.userId) {
          color = element.color;
          return;
        }
      });
      return color;
    },
    getColorText() {
      let color = "";
      let flag = false;
      this.colors.forEach((element) => {
        if (element.userId == this.data.userId) {
          color = element.color;
          const myColor = Color(color);
          flag = myColor.isLight();
        }
      });
      if (flag) return "#000000";
      else return "#ffffff";
    },
  },
};
</script>

<style>
.comment {
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  justify-content: space-between;
}

.comment:last-child {
  margin-bottom: 0;
}

.comment-box {
  width: 100%;
  margin-bottom: 12px;
  font-family: "Source Sans Pro", sans-serif;
}

.info {
  padding: 0 10px;
  display: flex;
  margin-bottom: 6px;
  align-items: flex-end;
  justify-content: space-between;
}

.name {
  font-size: 0.9em;
  font-weight: 600;
  /* color: #e36858; */
}

.time {
  font-size: 0.85em;
}

.tm-sender {
  color: #fff;
  margin-right: 12px;
  text-align: start;
}

.tm {
  color: #b7b9a8;
  margin-top: 20px;
  margin-left: 12px;
  text-align: end;
}

.message {
  padding: 12px;
  border-radius: 0.75rem;
  /* border-right: 2px solid white;
  border-bottom: 2px solid white; */
  font-size: 0.96em;
  font-weight: 500;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

img {
  height: 34px;
  border-radius: 50%;
}

.left {
  margin-left: 10px;
  margin-top: 4px;
}

.right {
  margin-right: 10px;
  margin-top: 28px;
}

.wd-85 {
  display: flex;
  width: 85%;
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
