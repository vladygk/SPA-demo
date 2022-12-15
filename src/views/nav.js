import { get } from "../api/api.js";
import { html, render, page } from "../lib.js";
import { getUserData, removeUserData } from "../utils.js";

const header = document.getElementsByTagName("header")[0];

const navTamplate = (hasUser,onLogout) => html`<a id="logo" href="/"
    ><img id="logo-img" src="./images/logo.png" alt=""
  /></a>

  <nav>
    <div>
      <a href="/dash">Dashboard</a>
    </div>

    ${hasUser
      ? html`<div class="user">
          <a href="/create">Add Album</a>
          <a @click = ${onLogout} href="javascript:void(0)">Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;

export function loadNav() {
  const user = getUserData();
  const hasUser = Boolean(user);

  async function onLogout(){
    await get('/users/logout');
    removeUserData();
    loadNav();
    page.redirect("/dash");
  }

  render(navTamplate(hasUser,onLogout), header);
}
