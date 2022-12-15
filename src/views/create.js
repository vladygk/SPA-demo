import { createEntry } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <h2>Add Album</h2>
    <form @submit=${onCreate} class="create-form">
      <input
        type="text"
        name="singer"
        id="album-singer"
        placeholder="Singer/Band"
      />
      <input type="text" name="album" id="album-album" placeholder="Album" />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        placeholder="Release date"
      />
      <input type="text" name="label" id="album-label" placeholder="Label" />
      <input type="text" name="sales" id="album-sales" placeholder="Sales" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export function loadCreate(ctx) {
  async function onCreate(data) {
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


    await createEntry(singer, album, imageUrl, release, label, sales);
    ctx.page.redirect("/dash");
  }

  ctx.render(createTemplate(createSubmitHandler(onCreate)));
}
