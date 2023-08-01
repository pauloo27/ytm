const serverPort = 4200;

function inject(name) {
  const script = document.createElement('script');
  script.src = `http://localhost:${serverPort}/web/${name}.js`;
  (document.head || document.documentElement).appendChild(script);
}

window.addEventListener('DOMContentLoaded', () => {
  inject('controller');
  inject('listener');
  inject('ws');

  inject('back-btn');
});
