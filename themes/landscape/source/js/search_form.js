(function ($) {
  const titleMatchedRange = 5;
  const contentMatchedRange = 20;
  let data = {};
  $.ajax({
    url: "/blog/db.json",
    success(res) {
      data = res.models;
    },
  });

  // Search
  var $searchWrap = $("#search-box-wrap"),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $("#nav-search-btn").on("click", function () {
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass("on");
    stopSearchAnim(function () {
      $(".search-box-input").focus();
    });
  });

  $(".search-box-input").on("blur", function () {
    startSearchAnim();
    $searchWrap.removeClass("on");
    stopSearchAnim();
  });

  $(".search-box-input").on("change", function (e) {
    const value = e.target.value;
    const posts = data.Post;
    if (value && posts) {
      const matchedPostList = posts
        .filter((post) => {
          const title = post.title;
          const content = $(post.content).text();
          return title.includes(value) || content.includes(value);
        })
        .map((post) => {
          const title = post.title;
          const content = $(post.content).text();
          const titleIndex = title.indexOf(value);
          const contentIndex = content.indexOf(value);
          post.matchedHead =
            titleIndex === -1
              ? `<div class="matched-title">${title}</div>`
              : `<div class="matched-title">${title.slice(
                  titleIndex - titleMatchedRange < 0
                    ? 0
                    : titleIndex - titleMatchedRange,
                  titleIndex
                )}<span class="matched-title-hover">${value}</span>${title.slice(
                  titleIndex + value.length,
                  titleIndex + value.length + titleMatchedRange
                )}</div>`;

          post.matchedContent =
            contentIndex === -1
              ? `<div class="matched-content">${content.slice(
                  0,
                  contentMatchedRange
                )}</div>`
              : `<div class="matched-content">${content.slice(
                  contentIndex - contentMatchedRange < 0
                    ? 0
                    : contentIndex - contentMatchedRange,
                  contentIndex
                )}<span class="matched-title-hover">${value}</span>${content.slice(
                  contentIndex + value.length,
                  contentIndex + value.length + contentMatchedRange
                )}</div>`;
          return post;
        })
        .map((post) => {
          const { matchedHead, matchedContent } = post;
          const div = document.createElement("div");
          div.setAttribute(
            "data-url",
            // `${post.date.match(/\d{4}-\d{2}-\d{2}/)[0].replace(/\-/g, "/")}
            `programming/${post.slug}`
          );
          div.className = "matched-box";
          div.innerHTML = `${matchedHead}${matchedContent}`;
          div.onclick = (e) => {
            const curDom = e.path.find((item) => item === div);
            const path = curDom.getAttribute("data-url");
            window.location.href = `/blog/${path}`;
          };
          return div;
        });

      $(".search-result-box").html(
        matchedPostList.length ? matchedPostList : `<div>暂无内容</div>`
      );
      $(".search-result-box").attr("style", "visibility:visible");
    } else {
      $(".search-result-box").attr("style", "visibility:hidden");
    }
  });
})(jQuery);
