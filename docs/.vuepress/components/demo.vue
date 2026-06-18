<template>
  <div id="artitalk_main" />
</template>

<script>
const artitalkScriptUrl =
  'https://unpkg.com/@hclonely/artitalk'

function loadArtitalk() {
  if (typeof window.Artitalk === 'function') {
    return Promise.resolve()
  }

  const existingScript = document.querySelector('script[data-artitalk]')
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = artitalkScriptUrl
    script.dataset.artitalk = ''
    script.addEventListener('load', resolve, { once: true })
    script.addEventListener('error', reject, { once: true })
    document.head.appendChild(script)
  })
}

export default {
  async mounted() {
    await loadArtitalk()

    if (typeof window.Artitalk !== 'function') {
      throw new TypeError('Artitalk script loaded without exposing a constructor')
    }

    this.artitalk = new window.Artitalk({
        serverURL: 'https://artitalk-server-test.vercel.app/',
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
  },
}
</script>
