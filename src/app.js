import { page, render } from "./lib.js";
import { loadCreate } from "./views/create.js";
import { loadDash } from "./views/dashboard.js";
import { loadDetails } from "./views/details.js";
import { loadEdit } from "./views/edit.js";
import { loadHome } from "./views/home.js";
import { loadLogin } from "./views/login.js";
import { loadNav } from "./views/nav.js";
import { loadRegister } from "./views/register.js";

const main = document.getElementsByTagName("main")[0];

loadNav();

page(decorateCtx);
page("/", loadHome);
page("/login",loadLogin);
page("/register",loadRegister);
page("/dash",loadDash);
page("/dash/:id",loadDetails);
page("/create",loadCreate);
page("/edit/:id",loadEdit);
page.start();

function decorateCtx(ctx, next) {
  ctx.render = renderMain;
  ctx.loadNav = loadNav;
  next();
}

function renderMain(content) {
  render(content, main);
}
