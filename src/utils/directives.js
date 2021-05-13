import Vue from 'vue'
export default () => {
    Vue.directive('clickoutside', {
        bind: function (el, binding, vnode) {
            function documentHandler(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e)
                }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        unbind: function (el, binding) {
            document.removeEventListener('click', el._vueClickOutside_);
            delete el._vueClickOutside_;
        }
    });

Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode))){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }

    })
}