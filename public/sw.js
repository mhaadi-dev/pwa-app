if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + ".js", a).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let o = {};
    const r = (e) => i(e, c),
      t = { module: { uri: c }, exports: o, require: r };
    s[c] = Promise.all(a.map((e) => t[e] || r(e))).then((e) => (n(...e), o));
  };
}
define(["./workbox-aa13a187"], function (e) {
  "use strict";
  importScripts("fallback-sdmiDov3_4BzGzoWyoqdD.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "22626ae39166c5d975a18b17d05d43d0"
        },
        {
          url: "/_next/static/chunks/428-008473f8f24ab32c.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/4bd1b696-e08cee46e9b2d97c.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/898-688318b7c3ba4156.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-46b579637d9455d1.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/api/send-notification/route-1fdd08c3e1df1caf.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/api/sendEmail/route-efcb5f47966047e6.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/api/todos/route-3104a80c71b2d4b8.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/layout-d2a56d9e9b1d910d.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/app/page-e99f5f835f765c86.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/framework-6b27c2b7aa38af2d.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/main-1a6dabb652afbe06.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/main-app-a14e21bd78ceacc1.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f"
        },
        {
          url: "/_next/static/chunks/webpack-05cc406d6a87b1a9.js",
          revision: "sdmiDov3_4BzGzoWyoqdD"
        },
        {
          url: "/_next/static/css/bc834bd1919e01c3.css",
          revision: "bc834bd1919e01c3"
        },
        {
          url: "/_next/static/media/569ce4b8f30dc480-s.p.woff2",
          revision: "ef6cefb32024deac234e82f932a95cbd"
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab"
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312"
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77"
        },
        {
          url: "/_next/static/sdmiDov3_4BzGzoWyoqdD/_buildManifest.js",
          revision: "19674bfef0e58cf58ab468dd10cd0bc7"
        },
        {
          url: "/_next/static/sdmiDov3_4BzGzoWyoqdD/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933"
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        {
          url: "/firebase-messaging-sw.js",
          revision: "1bf0b7ac7805a94133e0e37685789287"
        },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/images/icons/icon-128x128.png",
          revision: "440663eb5204fba91a327480531578fa"
        },
        {
          url: "/images/icons/icon-144x144.png",
          revision: "34522b4e980d041b77275e339334aa96"
        },
        {
          url: "/images/icons/icon-152x152.png",
          revision: "b1577bc277b76e2b34d8c146c1dc4cb2"
        },
        {
          url: "/images/icons/icon-192x192.png",
          revision: "26376f405aa6428603a0ade4499a444a"
        },
        {
          url: "/images/icons/icon-384x384.png",
          revision: "bf251bc7f8b040cb38bdf1f03ad18c1e"
        },
        {
          url: "/images/icons/icon-512x512.png",
          revision: "27559ef38c5350b53fcb67d9bfa73024"
        },
        {
          url: "/images/icons/icon-72x72.png",
          revision: "31e7999a97ad8296a6986b3072b9f6a0"
        },
        {
          url: "/images/icons/icon-96x96.png",
          revision: "1574cd7fecfaca978854e82c9c5b49d1"
        },
        { url: "/manifest.json", revision: "334778040361192d914eaac3a26212ee" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/offline.html", revision: "10b9bfddb76109b815fe78999e330e3b" },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: a
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers
                  })
                : s
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return "/" === e.url.pathname;
      },
      new e.NetworkFirst({
        cacheName: "html-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        var s = e.url;
        return /\.(css|js|woff2|woff|ttf)$/.test(s.pathname);
      },
      new e.StaleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      function (e) {
        return e.url, !0;
      },
      new e.NetworkOnly({
        cacheName: "fallback-cache",
        plugins: [
          { handlerDidError: async ({ request: e }) => self.fallback(e) }
        ]
      }),
      "GET"
    );
});
