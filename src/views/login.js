import { login } from "../api/user.js";
import {html} from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const loginTemplate = (onLogin) => html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit = ${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`;


export function loadLogin(ctx){

    async function onLogin(data){
        const email = data.email;
        const password = data.password;

        if(email === "" || password ===""){
            return alert("All fields are required!");
        }

        await login(email,password);
        ctx.loadNav();
        ctx.page.redirect("/dash")
    }

    ctx.render(loginTemplate(createSubmitHandler(onLogin)));
}