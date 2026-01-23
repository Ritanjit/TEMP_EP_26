import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B6eLvqPO.mjs';
import { manifest } from './manifest_B_7i50Rc.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/_---path_.astro.mjs');
const _page3 = () => import('./pages/events/_slug_.astro.mjs');
const _page4 = () => import('./pages/events.astro.mjs');
const _page5 = () => import('./pages/sponsors.astro.mjs');
const _page6 = () => import('./pages/webdev.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.11_@vercel+funct_85d1ac84ffb1a82f851f2e8f4c5f29a5/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/[...path].astro", _page2],
    ["src/pages/events/[slug].astro", _page3],
    ["src/pages/events/index.astro", _page4],
    ["src/pages/sponsors.astro", _page5],
    ["src/pages/webdev.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7d5a5cc1-a9a0-4e27-89da-54ddbc2db16b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
