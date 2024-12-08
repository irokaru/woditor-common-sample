const OriginalXMLHttpRequest = XMLHttpRequest;

// Proxied XMLHttpRequest to download zip files
class ProxiedXMLHttpRequest extends OriginalXMLHttpRequest {
  constructor() {
      super();
      this.addEventListener('readystatechange', () => {
          if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
            const url = this.responseURL;

            // zipファイルの場合にダウンロード処理を実行
            if (url.endsWith('.zip')) {
                console.log('Downloading zip file...');

                const blob = new Blob([this.response]);
                const fileName = url.split('/').pop();
                const objectUrl = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = objectUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                // リソースを解放
                URL.revokeObjectURL(objectUrl);
                a.remove();
            }
          }
      });
  }

  open(method, url, async, user, password) {
      super.open(method, url, async, user, password);
  }

  send(body) {
      super.send(body);
  }
}

window.XMLHttpRequest = ProxiedXMLHttpRequest;
