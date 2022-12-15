import { editById, getDataById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (onEdit,previuousData) => html` <section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit = ${onEdit} class="edit-form">
    <input type="text" .value = ${previuousData.singer} name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" .value = ${previuousData.album} name="album" id="album-album" placeholder="Album" />
    <input type="text" .value = ${previuousData.imageUrl} name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" .value = ${previuousData.release} name="release" id="album-release" placeholder="Release date" />
    <input type="text" .value = ${previuousData.label} name="label" id="album-label" placeholder="Label" />
    <input type="text" .value = ${previuousData.sales} name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`;


export async function loadEdit(ctx){
const id = ctx.params.id;



const previuousData = await getDataById(id);

async function onEdit(data){

    const singer = data.singer;
    const album = data.album;
    const imageUrl = data.imageUrl;
    const release = data.release;
    const label = data.label;
    const sales = data.sales;
    if (
      [singer, album, imageUrl, release, label, sales].some((x) => x === "")
    ) {
        return alert("All fields are required!");
    }

    await editById(id,singer, album, imageUrl, release, label, sales);
    
    ctx.page.redirect(`/dash/${id}`);
}

    ctx.render(editTemplate(createSubmitHandler(onEdit),previuousData));
}