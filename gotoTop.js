<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<div id="app" v-cloak>
  <transition>
		<div id="pagetop" v-show="scY > 300" @click="toTop" v-transition>
			To Top
		</div>
	</transition>
</div>

/* js *******************************************************************/
let app = new Vue({
  el: '#app',
  data: {
    scTimer: 0,
    scY: 0,
  },
  created: function(){
    //scイベント登録
    window.addEventListener("scroll", this.scEvent);
    this.getPostData();
  },
  methods: {
    //トップに戻る
    toTop: function() {
      let scrolled = window.pageYOffset;
      window.scrollTo(0, Math.floor(scrolled * 0.8));
      if (scrolled > 0) {
        window.setTimeout(this.toTop, 10);
      }
    },
    //scイベントで現在のスクロール値を取得
    scEvent: function() {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {

        this.scY = window.scrollY;

        clearTimeout(this.scTimer);
        this.scTimer = 0;

      }, 100);
    }
  }
});


/* css *******************************************************************/

[v-cloak] {
  display: none;
}
#app {
  margin: 16px;
  height: 4000px;
  background: linear-gradient(#7f88b1, #f35478);
}

#pagetop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 0 4px 0px #555;

  //出現動作に関係するのは此処より下
  transition: all 0.6s;
  &.v-enter,
  &.v-leave-to {
    opacity: 0;
    bottom: 10px;
  }
}
