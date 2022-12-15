import { deleteById, getDataById } from "../api/data.js";
import { getLikesCount, getOwnLikes, like } from "../api/likes.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  data,
  isOwner,
  onDelete,
  canLike,
  totalLikes,
  onLike
) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${data.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${data.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${data.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${data.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${data.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${data.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>
    <div id="action-buttons">
      ${canLike
        ? html`<a @click=${onLike} href="" id="like-btn">Like</a>`
        : nothing}
      <!--Edit and Delete are only for creator-->
      ${isOwner
        ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          `
        : nothing}
    </div>
  </div>
</section>`;

export async function loadDetails(ctx) {
  const id = ctx.params.id;
  let isOwner = false;
  const data = await getDataById(id);

  const user = getUserData();

  if (user) {
    isOwner = user._id === data._ownerId;
  }
  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (!choice) {
      return;
    }
    await deleteById(id);
    ctx.page.redirect("/dash");
  }
  let  hasLiked = undefined;
  if(user){
    hasLiked = await getOwnLikes(id, user._id);
  }
   
 
  const totalLikes = await getLikesCount(id);
  const canLike = !isOwner && hasLiked === 0;

  

  async function onLike() {
    await like(id);
    ctx.page.redirect(`/edit/${id}`);
  }
  ctx.render(
    detailsTemplate(data, isOwner, onDelete, canLike, totalLikes, onLike)
  );
}
