import { getAllData } from "../api/data.js";
import { html } from "../lib.js";

const dashTemplate = (data) => html` <section id="dashboard">
  <h2>Albums</h2>

  ${data.length === 0
    ? html`<h2>There are no albums added yet.</h2>`
    : html`<ul class="card-wrapper">
        ${data.map(x => cardTemplate(x))}
      </ul>`}
  <!-- Display an h2 if there are no posts -->
</section>`;

const cardTemplate = (x) => html`<li class="card">
  <img src=${x.imageUrl} alt="travis" />
  <p><strong>Singer/Band: </strong><span class="singer">${x.singer}</span></p>
  <p><strong>Album name: </strong><span class="album">${x.album}</span></p>
  <p>
    <strong>Sales:</strong
    ><span class="sales">${x.sales}</span>
  </p>
  <a class="details-btn" href="/dash/${x._id}">Details</a>
</li>`;

export async function loadDash(ctx) {
    const data = await getAllData();

  ctx.render(dashTemplate(data));
}
