import { register } from "../api/user.js";
import {html} from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const registerTemplate = (onRegister) => html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit =${onRegister} class="login-form">
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`;



export function loadRegister(ctx){

    async function onRegister(data){
        const email = data.email;
        const password = data.password;
        const repass = data["re-password"];

        if(email === "" || password ===""|| repass ===""){
            return alert("All fields are required!");
        }

        if(password !== repass){
            return alert("Password doesn\'t match!");
        }

        await register(email,password);
        ctx.loadNav();
        ctx.page.redirect("/dash")
    }

    ctx.render(registerTemplate(createSubmitHandler(onRegister)));
}