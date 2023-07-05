window.onload = () => {
  console.log("kkx");
  var del = document.querySelector(".delete");
  var com = document.querySelector(".comment");
  var ans = document.querySelector(".answer");
  var inp = document.querySelector(".speak");
  var rep = document.querySelector(".reply");
  del.addEventListener("click", () => {
    com.style.display = "none";
  });
  var text = ans.parentNode.querySelector("span").innerText.replace(":", "");
  ans.addEventListener("click", () => {
    inp.value = `回复:${text}`;
    inp.focus();
  });
  inp.addEventListener("blur", () => {
    var div1 = document.createElement("div");
    div1.className = "reply-item";
    var answ = document.createElement("span");
    answ.className = "answer";
    answ.innerText = "删除";
    answ.addEventListener("click", () => {
      div1.style.display = "none";
    });
    if (inp.value.indexOf(":") != -1) {
      var kkx = inp.value.replace(`回复:${text}`, "");
      console.log(kkx);
      if (kkx.replace(/\s*/g, "") == "") {
        return alert("输入不能为空,请重新输入");
      }
      div1.innerHTML = `<span class="orange">我>>${text}:</span>
                    <span>${kkx}</span>`;
      div1.appendChild(answ);
      inp.value ='';
    } else {
      if (inp.value.replace(/\s*/g, "") == "") {
        return alert("输入不能为空,请重新输入");
      }
      div1.innerHTML = `<span class="orange">我:</span>
                <span>${inp.value}</span>`;
      div1.appendChild(answ);
      inp.value = "";
    }
    rep.appendChild(div1);
  });
  var onmeg = document.querySelector(".onmeg");
  var name = document.querySelector(".ipname");
  var meg = document.querySelector(".ipmeg");
  var remark = document.querySelector(".remark");
  onmeg.addEventListener("click", () => {
    if (
      name.value.replace(/\s*/g, "") == "" ||
      meg.value.replace(/\s*/g, "") == ""
    ) {
      return alert("输入不能为空,请重新输入");
    }
    var comment = document.createElement("div");
    var button = document.createElement("button");
    var reply = document.createElement("div");
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "评论...";
    input.className = "speak";
    comment.className = "comment";
    button.className = "delete";
    reply.className = "reply";
    button.innerText = "X";
    comment.innerHTML = `
                <div class="portrait"></div>
                <div class="plun">
                    <span class="orange">${name.value}: </span><span>${meg.value}</span>
                    <br>
                </div>`;
    comment.appendChild(button);
    button.onclick = () => {
      comment.style.display = "none";
    };
    input.addEventListener("blur", () => {
      if (input.value.replace(/\s*/g, "") == "") {
        return alert("输入不能为空,请重新输入");
      }
      var div = document.createElement("div");
      div.className = "reply-item";
      var answer = document.createElement("span");
      answer.className = "answer";
      answer.innerText = "删除";
      div.innerHTML = `<span class="orange">我: </span>
              <span>${input.value}</span>`;
      div.appendChild(answer);
      answer.addEventListener("click", () => {
        div.style.display = "none";
      });
      reply.appendChild(div);
      input.value = "";
    });
    comment.appendChild(reply);
    comment.appendChild(input);
    remark.appendChild(comment);
    name.value = "";
    meg.value = "";
  });
};
