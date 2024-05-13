export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="360" height="152"/>
        </a>
        <ul class="list-stat">
          <li class="item">
            <h2 class="title">likes</h2>
            <p class="stat">${likes}</p>
          </li>
          <li class="item">
            <h2 class="title">Views</h2>
            <p class="stat">${views}</p>
          </li>
          <li class="item">
            <h2 class="title">Comments</h2>
            <p class="stat">${comments}</p>
          </li>
          <li class="item">
            <h2 class="title">Downloads</h2>
            <p class="stat">${downloads}</p>
          </li>
        </ul>
      </li>`
    )
    .join('');
}
