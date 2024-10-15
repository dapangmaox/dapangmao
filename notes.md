### RxJS 回调函数立即执行

有些 Observable 会同步发出值，导致订阅回调立即执行。比如 `of`。

```ts
it('#getObservableValue should return value from observable', (done: DoneFn) => {
  service.getObservableValue().subscribe((value) => {
    expect(value).toBe('observable value');
    done();
    console.log('getObservableValue subscribe');
  });
  console.log('getObservableValue end');
});
```

这段代码会先打印 `getObservableValue end`，再打印 `getObservableValue subscribe`。

### 内联元素间距

在 HTML 中，内联元素（如 <button>）之间的默认间距通常是由空白字符（如空格、换行符和制表符）引起的。这些空白字符会在浏览器中渲染为一个空格。因此，如果你在 HTML 中有换行或空格，浏览器会在元素之间显示一个空格。

```html
<button>a</button>
<button>a</button>
<button>a</button>
```

```html
<button>a</button><button>a</button><button>a</button>
```

### https 证书

1. 申请腾讯云免费证书，下载证书文件（nginx）。
2. 替换 `/etc/nginx/ssl` 下的证书文件。
3. 重启 nginx。
