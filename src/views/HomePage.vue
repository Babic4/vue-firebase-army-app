<template>
  <audio ref="audio">
    <source src="../assets/bridge.mp3" type="audio/mp3" />
  </audio>
  <Header />
  <div class="middle" ref="middle">
    <div class="ticker">
      <div class="ticker-wrapper">
        <div>
          <div>I will be back in</div>
          <div class="separator"><i class="fas fa-asterisk"></i></div>
        </div>
        <div>
          <div>I will be back in</div>
          <div class="separator"><i class="fas fa-asterisk"></i></div>
        </div>
        <div>
          <div>I will be back in</div>
          <div class="separator"><i class="fas fa-asterisk"></i></div>
        </div>
      </div>
    </div>
    <div class="ticker-two">
      <div
        class="ticker-two-wrapper"
        @click="playAudio"
        :class="[isPlay ? 'pause' : 'play']"
      >
        <div>
          <div>Card me please, Forgis make 'em stop breathin'</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>Got CCs and Louis Vs out of every season</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>
            A couple yachts, they got some thots that trot the seven seas
          </div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>Look out the window, what do I see?</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
        </div>
        <div>
          <div>Card me please, Forgis make 'em stop breathin'</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>Got CCs and Louis Vs out of every season</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>
            A couple yachts, they got some thots that trot the seven seas
          </div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
          <div>Look out the window, what do I see?</div>
          <div class="btn-ticker">
            <i v-if="!isPlay" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      class="finnaly"
      ref="finnaly"
      :class="end ? '' : 'dis-none'"
      data-text="The END."
    >
      The END.
    </div>
    <div class="timer" ref="timer" :class="end ? 'dis-none' : ''">
      <div class="timer-items">
        <div
          class="timer-item timer-days"
          :data-text="days < 10 ? '0' + days : days"
        >
          {{ tDays }}
        </div>
        <div
          class="timer-item timer-hours"
          :data-text="hours < 10 ? '0' + hours : hours"
        >
          {{ tHours }}
        </div>
        <div
          class="timer-item timer-minutes"
          :data-text="minutes < 10 ? '0' + minutes : minutes"
        >
          {{ tMinutes }}
        </div>
        <div
          class="timer-item timer-seconds"
          :data-text="seconds < 10 ? '0' + seconds : seconds"
        >
          {{ tSeconds }}
        </div>
      </div>
      <div class="timer-items-text">
        <div class="timer-item-text" data-text="d">d</div>
        <div class="timer-item-text" data-text="h">h</div>
        <div class="timer-item-text" data-text="m">m</div>
        <div class="timer-item-text" data-text="s">s</div>
      </div>
    </div>
    <div class="comments-box">
      <div class="bg-form">
        <div v-if="!isLogin" class="not-auth">
          To leave a comment <span class="link" @click="signIn">Sign In</span>
        </div>
        <form v-else @submit.prevent="addComment" class="form-comment">
          <input
            type="text"
            v-model="message"
            placeholder="Comment..."
            class="input"
          />
          <button class="button b-send" type="submit">Send</button>
        </form>
      </div>
      <div class="comments">
        <Message
          v-for="message in messages"
          :key="message.id"
          :data="message"
          :sender="message.userId === user?.uid"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Message from "@/components/Message";
import { ref } from "vue";

import { useAuth } from "@/firebase";
import { useChat } from "@/firebase";

export default {
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      end: false,
      interval: null,
      isPlay: false,
    };
  },
  methods: {
    countdownTimer() {
      const lastDay = new Date(2023, 9, 27);
      const diff = lastDay - new Date();
      if (diff <= 0) {
        clearInterval(this.interval);
      }
      this.days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      this.hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      this.minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      this.seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      if (
        this.days <= 0 &&
        this.hours <= 0 &&
        this.minutes <= 0 &&
        this.seconds <= 0
      ) {
        this.end = true;
      } else {
        this.end = false;
      }
    },
    // addComment() {
    //   if (this.message) {
    //     this.comments.push({ message: this.message });
    //     this.message = "";
    //   }
    // },
    setColor(id) {
      this.colors.forEach((element) => {
        if (element.userId == id) {
          return element;
        }
      });
    },
    handleScroll() {
      if (
        window.scrollY + window.innerHeight + 2 >=
        document.body.scrollHeight
      ) {
        this.$refs.middle.style.transform = "scale(0.97)";
        // document.body.style.margin = "0 25px";
      } else {
        this.$refs.middle.style.transform = "scale(1)";
        // document.body.style.margin = "0";
      }
    },
    playAudio() {
      this.isPlay = true;
      this.$refs.audio.play();
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    // console.log(this.$refs.audio);
    let shadow = "";
    let param = window.screen.width <= 768 ? 18 : 30;
    for (let i = 0; i < param; i++) {
      shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 #e36858";
    }
    this.$refs.finnaly.style.textShadow = shadow;
    this.$refs.timer.style.textShadow = shadow;
    this.countdownTimer();
    this.interval = setInterval(this.countdownTimer, 1000);
    this.$refs.audio.volume = 0.69;
    this.$refs.audio.onended = () => {
      this.isPlay = false;
    };
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    tDays() {
      return this.days < 10 ? "0" + this.days : this.days;
    },
    tHours() {
      return this.hours < 10 ? "0" + this.hours : this.hours;
    },
    tMinutes() {
      return this.minutes < 10 ? "0" + this.minutes : this.minutes;
    },
    tSeconds() {
      return this.seconds < 10 ? "0" + this.seconds : this.seconds;
    },
  },
  setup() {
    const { user, isLogin, signIn, logOut } = useAuth();
    const { messages, sendMessage } = useChat();

    const message = ref("");
    const addComment = () => {
      sendMessage(message.value);
      message.value = "";
    };

    return {
      user,
      isLogin,
      signIn,
      logOut,
      messages,
      message,
      addComment,
    };
  },
  components: {
    Header,
    Footer,
    Message,
  },
};
</script>

<style>
@font-face {
  font-family: Nagoda;
  src: url("../assets/fonts/Nagoda.otf") format("opentype");
}

@font-face {
  font-family: Projeckt Blackbird;
  src: url("../assets/fonts/Projekt Blackbird v2.otf") format("opentype");
}

.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  background-color: #0c0d0d;
  /* overflow-x: hidden; */
  border-radius: 0 0 1.25rem 1.25rem;
  transition-duration: 0.4s;
}

.timer {
  margin-top: 60px;
  color: #fff;
  /* color: #f2ff00; */
  /* text-shadow: -7px 7px 0px #e36858, -14px 14px 0px #986306,
    -21px 21px 0px #4a3003; */
  letter-spacing: 2px;
  transform: rotate(-28deg) skew(25deg);
  /* font-family: Nagoda; */
  font-family: "Audiowide", cursive;
  font-size: 8rem;
  display: flex;
  height: 100%;
  /* display: none; */
}

.timer-item:before {
  content: attr(data-text);
  position: absolute;
  top: 50px;
  left: -50px;
  color: #942a1d;
  text-shadow: none;
  filter: blur(12px);
  z-index: -1;
}

.timer-item-text:before {
  content: attr(data-text);
  position: absolute;
  top: 50px;
  left: -50px;
  color: #942a1d;
  text-shadow: none;
  filter: blur(12px);
  z-index: -1;
}

.timer-items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.timer-items-text {
  display: flex;
  flex-direction: column;
}

.timer-items > div {
  display: flex;
}

.timer-item {
  position: relative;
  min-width: 60px;
  margin-left: 10px;
  margin-right: 30px;
  padding-bottom: 15px;
}

.timer-item-text {
  position: relative;
  padding-bottom: 15px;
}

.finnaly {
  transform: rotate(-28deg) skew(25deg);
  margin: 200px 0;
  color: #fff;
  font-family: "Audiowide", cursive;
  font-size: 8rem;
  display: flex;
  height: 100%;
  letter-spacing: 2px;
}

.finnaly:before {
  content: attr(data-text);
  position: absolute;
  top: 50px;
  left: -50px;
  color: #942a1d;
  text-shadow: none;
  filter: blur(12px);
  z-index: -1;
}

.dis-none {
  display: none;
}

.comments-box {
  font-family: "Source Sans Pro", sans-serif;
  display: flex;
  flex-direction: column;
  /* margin: 50px 0; */
  margin-top: 60px;
  width: 100%;
  align-items: center;
}

.bg-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.75rem;
  background-color: #242626;
}

.form-comment {
  width: 675px;
  display: flex;
  padding: 2rem;
}

.input {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  outline: none;
  padding: 12px 16px;
  border: none;
  background: white;
  font-size: 0.9em;
  width: 100%;
  border-radius: 10px 0 0 10px;
  /* background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px); */
}

.button {
  cursor: pointer;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  padding: 12px 16px;
  background: #e36858;
  color: black;
  border: none;
  font-size: 0.9em;
  transition-duration: 0.2s;
}

.button:hover {
  color: white;
}

.b-send {
  border-radius: 0 10px 10px 0;
}

.comments {
  display: flex;
  flex-direction: column;
  width: 675px;
  margin: 0.5rem 0 4rem 0;
  border-radius: 0.75rem;
  border: 2px solid #242626;
  padding: 2rem;
}

.not-auth {
  color: #fff;
  padding: 2rem;
}

.link {
  cursor: pointer;
  color: #e36858;
}

.ticker {
  height: 100%;
  width: 100%;
  margin-top: 120px;
  display: flex;
}

.ticker-wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.ticker-wrapper > div {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  text-transform: uppercase;
  color: #e36858;
  font-size: 6em;
  font-family: "Audiowide", cursive;
  /* font-weight: 600; */
  /* font-family: "Source Sans Pro", sans-serif; */
  padding-left: 3.3rem;
  animation: ticker 5s infinite linear;
}

.ticker-two {
  height: 100%;
  width: 100%;
  display: flex;
}

.ticker-two-wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: row-reverse;
  cursor: pointer;
}

.ticker-two-wrapper > div {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  text-transform: uppercase;
  /* color: #b7b9a8; */
  font-size: 2em;
  font-family: "Audiowide", cursive;
  /* font-weight: 600; */
  /* font-family: "Source Sans Pro", sans-serif; */
  animation: ticker-two 30s infinite linear;
  transition-duration: 0.3s;
}

.ticker-two-wrapper > div > div {
  padding: 0 1rem;
}

.btn-ticker {
  font-size: 1.5rem;
}

.play {
  color: #b7b9a8;
}

.pause {
  color: #fff;
}

@keyframes ticker-two {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}

.separator {
  margin-left: 3.3rem;
  font-size: 4.3rem;
  animation: rotation 3s infinite linear;
}

@keyframes ticker {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

/* -------------------------  adaptive  -------------------------- */
/*==========  Desktop First  ========== */
/* Large Devices, Wide Screens */
@media only screen and (max-width: 1200px) {
  .middle {
    overflow-x: hidden;
  }
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) {
  .timer {
    margin-top: 100px;
    font-size: 6rem;
  }

  .finnaly {
    margin-top: 100px;
    font-size: 6rem;
  }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .form-comment {
    width: 100%;
    padding: 22px;
  }

  .comments {
    border: none;
    width: 100%;
    padding: 1.5rem;
  }

  .timer {
    transform: rotate(0) skew(0);
  }

  .timer-item:before {
    top: 18px;
    left: -18px;
  }

  .timer-item-text:before {
    top: 18px;
    left: -18px;
  }

  .finnaly {
    transform: rotate(0) skew(0);
  }

  .finally:before {
    top: 18px;
    left: -18px;
  }

  .ticker-wrapper > div {
    font-size: 4em;
  }

  .separator {
    font-size: 2.7rem;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .form-comment {
    width: 100%;
    padding: 22px 12px;
  }

  .comments {
    width: 100%;
    padding: 1rem;
  }

  .timer {
    font-size: 5rem;
  }

  .ticker-wrapper > div {
    font-size: 3em;
    padding-left: 2rem;
  }

  .finnaly {
    font-size: 5rem;
  }

  .finnaly:before {
    font-size: 5rem;
  }

  .separator {
    margin-left: 2rem;
    font-size: 2rem;
  }
}

/*# sourceMappingURL=adaptive.css.map */
</style>
