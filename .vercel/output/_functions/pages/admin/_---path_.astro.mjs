import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Cef6vQpx.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Admin", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "B:/Projects/EP 26/src/components/react/Admin/Admin", "client:component-export": "default" })}`;
}, "B:/Projects/EP 26/src/pages/admin/[...path].astro", void 0);

const $$file = "B:/Projects/EP 26/src/pages/admin/[...path].astro";
const $$url = "/admin/[...path]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
