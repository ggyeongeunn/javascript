// html element
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const count = document.querySelector("#count");

// save task data
let tasks = [
  {
    id: 1,
    text: "study html",
    done: false,
  },
  {
    id: 2,
    text: "study css",
    done: false,
  },
];

// 다음에 사용할 id 번호
let nextId = 3;

// R - 목록 출력(Read)
function renderTasks() {
  // 기존 화면 비우기(초기화)
  taskList.innerHTML = "";

  // 배열의 데이터를 하나씩 화면에 출력
  tasks.forEach((task) => {
    const liE = document.createElement("li");
    // 할 일 내용
    const spanE = document.createElement("span");
    // taskList.innerHTML += `<li>${task.id}. ${task.text}</li>`;

    spanE.className = "task-text";
    spanE.textContent = task.text;
    // console.log(spanE);

    // 완료 여부에 따라 클래스 추가
    if (task.done === true) {
      spanE.classList.add("done");
    } else {
      spanE.classList.remove("done");
    }
    // 완료 체크 버튼
    const chkBtn = document.createElement("button");
    chkBtn.textContent = task.done ? "cancel" : "done";

    // 완료 버튼 클릭 시 함수
    chkBtn.addEventListener("click", () => {
      task.done = !task.done;
      // 화면 출력 함수 재사용
      renderTasks();
    });

    // 수정 버튼
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.className = "edit-btn";

    // 수정 버튼 클릭 시 함수
    editBtn.addEventListener("click", () => {
      const nextText = prompt("insert edit task", task.text);
      if (nextText !== null && nextText.trim() !== "") {
        task.text = nextText;
      }
      renderTasks();
    });

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.textContent = "delete";
    delBtn.className = "delete-btn";
    // 삭제 버튼 클릭 시 함수
    delBtn.addEventListener("click", () => {
      const ok = confirm("delete?");
      if (ok) {
        // 현재 삭제하려는 할 일을 제외하고 나머지만 남기기
        tasks = tasks.filter((item) => {
          return item.id !== task.id;
          // return : 조건에 맞는 결과만 실행?
        });
        renderTasks();
      }
    });

    // 버튼 담을 영역
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(chkBtn, editBtn, delBtn);

    // 목록에 내용과 버튼 넣기
    liE.append(spanE, actions);
    taskList.append(liE);
    // console.log(taskList);
  });

  // 전체 개수와 완료 개수
  const doneCount = tasks.filter((task) => {
    return task.done;
  }).length;
  console.log(doneCount);
  count.textContent = `Done : ${tasks.length} / Total : ${doneCount}`;
}

// C - create
taskForm.addEventListener("submit", (e) => {
  // 새로고침 막기
  e.preventDefault();
  const text = taskInput.value.trim();
  // 빈 내용은 등록하지 않음
  if (text === "") {
    alert("insert task");
  } else {
    // tasks 에 객체 추가
    tasks.push({
      id: tasks.length + 1,
      text: text,
      done: false,
    });
  }

  // 입력창 초기화
  taskInput.value = "";

  // 변경된 배열 화면에 추가
  renderTasks();
});

// 처음 화면 출력
renderTasks();
