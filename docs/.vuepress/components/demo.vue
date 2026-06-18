<template>
  <div id="artitalk_main" />
</template>

<script>
export default {
  mounted() {
    function addScript(url) {
      const script = document.createElement('script')
      script.id = 'at'
      url.includes('appId') ? (script.innerHTML = url) : (script.src = url)
      document.head.appendChild(script)
    }

    addScript(`
      new Artitalk({
        appId: 'ogP8qj3veMh0LFpFWMPOyF0X-MdYXbMMI',
        appKey: 'nHXLd3N3Jgh460t2iRQKWAtr',
        shuoPla: 'Demo页密码：123456',
        bgImg: 'https://cdn.jsdelivr.net/gh/drew233/cdn/20200409110727.webp',
        atEmoji: {
          huaji: 'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/smilies/icon_huaji.gif',
          baiyan: 'https://cdn.jsdelivr.net/gh/Artitalk/Artitalk-emoji/baiyan.png',
          bishi: 'https://cdn.jsdelivr.net/gh/Artitalk/Artitalk-emoji/bishi.png',
          bizui: 'https://cdn.jsdelivr.net/gh/Artitalk/Artitalk-emoji/bizui.png',
          chan: 'https://cdn.jsdelivr.net/gh/Artitalk/Artitalk-emoji/chan.png'
        }
      })
    `)
  },
  unmounted() {
    document
      .querySelectorAll('#at')
      .forEach((element) => element.parentNode.removeChild(element))
    delete window.AV
  },
}
</script>
