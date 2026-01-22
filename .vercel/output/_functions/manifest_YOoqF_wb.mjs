import { p as decodeKey } from './chunks/astro/server_Cef6vQpx.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CUWTNdX8.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///B:/Projects/EP%2026/","cacheDir":"file:///B:/Projects/EP%2026/node_modules/.astro/","outDir":"file:///B:/Projects/EP%2026/dist/","srcDir":"file:///B:/Projects/EP%2026/src/","publicDir":"file:///B:/Projects/EP%2026/public/","buildClientDir":"file:///B:/Projects/EP%2026/dist/client/","buildServerDir":"file:///B:/Projects/EP%2026/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"events/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/events","isIndex":true,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/index.astro","pathname":"/events","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sponsors/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sponsors","isIndex":false,"type":"page","pattern":"^\\/sponsors\\/?$","segments":[[{"content":"sponsors","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sponsors.astro","pathname":"/sponsors","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"webdev/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/webdev","isIndex":false,"type":"page","pattern":"^\\/webdev\\/?$","segments":[[{"content":"webdev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/webdev.astro","pathname":"/webdev","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.11_@vercel+funct_85d1ac84ffb1a82f851f2e8f4c5f29a5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/Admin.BvkbXZbJ.css"}],"routeData":{"route":"/admin/[...path]","isIndex":false,"type":"page","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"src/pages/admin/[...path].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["B:/Projects/EP 26/src/pages/index.astro",{"propagation":"none","containsHead":true}],["B:/Projects/EP 26/src/pages/404.astro",{"propagation":"none","containsHead":true}],["B:/Projects/EP 26/src/pages/events/[slug].astro",{"propagation":"none","containsHead":true}],["B:/Projects/EP 26/src/pages/events/index.astro",{"propagation":"none","containsHead":true}],["B:/Projects/EP 26/src/pages/sponsors.astro",{"propagation":"none","containsHead":true}],["B:/Projects/EP 26/src/pages/webdev.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin/[...path]@_@astro":"pages/admin/_---path_.astro.mjs","\u0000@astro-page:src/pages/events/[slug]@_@astro":"pages/events/_slug_.astro.mjs","\u0000@astro-page:src/pages/events/index@_@astro":"pages/events.astro.mjs","\u0000@astro-page:src/pages/sponsors@_@astro":"pages/sponsors.astro.mjs","\u0000@astro-page:src/pages/webdev@_@astro":"pages/webdev.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.11_@vercel+funct_85d1ac84ffb1a82f851f2e8f4c5f29a5/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_YOoqF_wb.mjs","B:/Projects/EP 26/node_modules/.pnpm/astro@5.16.11_@vercel+funct_85d1ac84ffb1a82f851f2e8f4c5f29a5/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DHwxjmEz.mjs","@components/react/hero/HeroParallax":"_astro/HeroParallax.BxEB3VuV.js","@components/react/sections/AboutEventsParallax":"_astro/AboutEventsParallax.CzXGLuDC.js","@components/react/sponsors/SponsorsSection":"_astro/SponsorsSection.BTuJYVyr.js","@components/react/Navbar":"_astro/Navbar.DDtupJyR.js","@components/react/Preloader/Preloader":"_astro/Preloader.EvNutsh9.js","B:/Projects/EP 26/src/components/react/Admin/Admin":"_astro/Admin.NiTuF5dR.js","@astrojs/react/client.js":"_astro/client.C4l-rKLV.js","B:/Projects/EP 26/src/components/LenisScroll.astro?astro&type=script&index=0&lang.ts":"_astro/LenisScroll.astro_astro_type_script_index_0_lang.DotBxwCg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.BKEnW-Ob.css","/_astro/index.DXKoNgQo.css","/Euphuism26 DP.jpg","/Euphuism26 logo m1.png","/Euphuism26 logo m2.png","/Euphuism26 logo trans.png","/Euphuism26Hero.jpg","/favicon.svg","/icon-192.png","/vite.svg","/bg/gamusa.png","/bg/gamusa2.png","/events/event-card-dummy.png","/hero/backdrop1.png","/hero/backdrop2.png","/hero/bihu-dancing.gif","/hero/bihu-grp-dancing.gif","/hero/bihu.png","/hero/rhino.png","/hero/tree1.png","/hero/tree2.png","/hero/tree_rhino.png","/sponsors/decathlon.png","/sponsors/frint.png","/sponsors/gplus.png","/sponsors/hp.png","/sponsors/sbi.png","/_astro/AboutEventsParallax.CzXGLuDC.js","/_astro/Admin.BvkbXZbJ.css","/_astro/Admin.NiTuF5dR.js","/_astro/client.C4l-rKLV.js","/_astro/events.CmGLxQJx.js","/_astro/HeroParallax.BxEB3VuV.js","/_astro/index.WFquGv8Z.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LenisScroll.astro_astro_type_script_index_0_lang.DotBxwCg.js","/_astro/Navbar.DDtupJyR.js","/_astro/Preloader.EvNutsh9.js","/_astro/proxy.C5_YSTta.js","/_astro/sponsors.CwPPqDAc.js","/_astro/SponsorsSection.BTuJYVyr.js","/_astro/use-transform.gZgGObgq.js","/hero/hq/backdrop1.png","/hero/hq/backdrop2.png","/hero/hq/bihu.png","/hero/hq/rhino.png","/hero/hq/tiger.png","/hero/hq/tree1.png","/hero/hq/tree2.png","/hero/hq/tree_rhino.png","/404.html","/events/index.html","/sponsors/index.html","/webdev/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"yKV7kLzVvY2srNXjumk6gKSoHSOzxOB/FdwXbMwE3uk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
