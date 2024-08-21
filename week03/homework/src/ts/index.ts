import '../css/index.css';
import fetch from './utils/request';

interface QuestionListNode {
  questions: QuestionLightNode[];
  total: number;
  hasMore: boolean;
}

interface QuestionLightNode {
  acRate: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  freqBar: number;
  paidOnly: boolean;
  status: string;
  isFavor: boolean;
  solutionNum: number;
  title: string;
  titleCn: string;
  titleSlug: string;
}

interface Variables {
  categorySlug:string;
  skip:number;
  limit:number;
  filters:{[key: string]: string | null};
}

interface Body {
  query:string;
  variables:Variables;
  operationName:string;
}

const body : Body = {
  query: `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        hasMore
        total
        questions {
          acRate
          difficulty
          freqBar
          frontendQuestionId
          isFavor
          paidOnly
          solutionNum
          status
          title
          titleCn
          titleSlug
          topicTags {
            name
            nameTranslated
            id
            slug
          }
          extra {
            hasVideoSolution
            topCompanyTags {
              imgUrl
              slug
              numSubscribed
            }
          }
        }
      }
    }`,
  variables: {
    categorySlug: "all-code-essentials",
    skip: 0,
    limit: 50,
    filters: {}
  },
  operationName: "problemsetQuestionList"
}

const textMapping : { [key: string]: string } = {
  "全部题目": "all-code-essentials",
  "算法": "algorithms",
  "数据库": "database",
  "Shell": "shell",
  "多线程": "concurrency",
  "动态规划": "dynamic-programming",
  "字符串":"ZdJfCLlK",
  "数组":"fpvzr6zL",
  "程序员面试金典（第 6 版）" : "xb9lfcwi",
  "递归":"7XPUUqF5",
  "👨‍💻 LeetCode 精选 TOP 面试题" : "2ckc81c",
  "🔥 LeetCode 热题 HOT 100" : "2cktkvj",
  "💙 LeetCode 精选数据库 70 题" : "qgq7m9e",
  "🧡 LeetCode 精选算法 200 题" : "qg88wci",
  "🏆 力扣杯 - 竞赛合集" : "7cyqwuv",
  "🐧 腾讯精选练习 50 题" : "ex0k24j",
  "简单":"EASY",
  "中等":"MEDIUM",
  "困难":"HARD"
}

const diff : { [key: string]: string } = {
  "HARD":"困难",
  "MEDIUM":"中等",
  "EASY":"简单"
}

// 向leetcode post页面展示的题目数据
async function postExample(body : Body) : Promise<QuestionListNode>{
  const headers : object = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "baggage": "sentry-environment=production,sentry-release=463ce6b1,sentry-transaction=%2Fproblemset%2F%5B%5B...slug%5D%5D,sentry-public_key=1595090ae2f831f9e65978be5851f865,sentry-trace_id=9b0efe3e5e354e1aaa32bd3d84913f85,sentry-sample_rate=0.03",
    "content-type": "application/json",
    "random-uuid": "67e5ccae-64aa-a3bb-2a66-ea79acef2a2e",
    "sentry-trace": "9b0efe3e5e354e1aaa32bd3d84913f85-9ba7f8224634bfc6-0",
    "x-csrftoken": "2W2ZJF5EleSiFYPT3oMklD1DctFx6lALDR3lB7ZifQHAXNY95jZDqrf3OpckK7ed",
  };
  const data: QuestionListNode = await fetch('https://leetcode.cn/graphql/', 'POST', body, headers);
  return data;
}

// 样式切换，点击某个类别时，切换到特定的样式下
function toggleActiveStyle(element: Element, active: boolean) {
  if (active) {
    element.classList.add('light-active');
  } else {
    element.classList.remove('light-active');
  }
}

// 数据展示函数
function displayData(data: QuestionListNode, page_show: number) {
  const contentArea = document.querySelector('.content') as HTMLElement; 
  contentArea.innerHTML = ''; // 清空旧数据

  // 确定页面展示多少数据
  const total: number = data.total;
  const show_num : number = total > page_show? page_show : total;

  // 动态创建每一行元素并插入数据
  for(let i = 0; i < show_num; i++){
    const divs: HTMLElement[] = [];
    for(let j  = 0; j < 5; j++){
      const new_div : HTMLElement = document.createElement('div');
      divs.push(new_div);
    }

    divs[0].classList.add("bottom-content");
    divs[1].classList.add("question-title");
    divs[2].classList.add("question-solve");
    divs[3].classList.add("question-pass");
    divs[4].classList.add("question-level");

    divs[1].innerHTML = data.questions[i].titleCn;
    divs[2].innerHTML = data.questions[i].solutionNum.toString();
    divs[3].innerHTML = (data.questions[i].acRate * 100).toFixed(1).toString() + '%';
    divs[4].innerHTML = diff[data.questions[i].difficulty];
    if(data.questions[i].difficulty === "HARD") {
      divs[4].style.color = "rgb(255 45 85)";
    }else if (data.questions[i].difficulty === "MEDIUM") {
      divs[4].style.color = "rgb(255 184 0)";
    }else {
      divs[4].style.color = "rgb(0 175 155)";
    }

    for(let j : number = 1; j < 5; j++){
      divs[0].appendChild(divs[j]);
    }

    if(i % 2 != 0){
      divs[0].style.backgroundColor = "rgb(247, 248, 250)";
    }
    contentArea.appendChild(divs[0]);
  }

}

// 类别选择实现，给父元素添加监听事件，针对某个子元素被点击了去获取子元素的类别并将去post数据展示在页面上
async function setupDivListeners() {
  const parentElement = document.querySelector('.nav-classify') as HTMLElement;
  
  if (!parentElement) return;

  //页面加载就有数据展示在页面上
  try {
    const response = await postExample(body);
    displayData(response, 50);
  } catch (error) {
    alert(error);
  }

  // 获取所有的 div 子元素
  const divElements = parentElement.querySelectorAll('div') as NodeListOf<HTMLDivElement>;

  // 题目类别 添加点击事件监听器
  divElements.forEach(div => {
    div.addEventListener('click', async () => {
      // 清除每个item的 light-active 样式
      divElements.forEach(d => toggleActiveStyle(d, false));
      // 更新当前点击的 div 的 light-active 样式
      toggleActiveStyle(div, true);

      // 获取点击的类别名
      const text : string | null = div.innerText;
      if (text && textMapping[text]) {
        body.variables.categorySlug = textMapping[text];
        body.variables.filters = {};
      }

      // 获取数据并显示到页面上
      try {
        const response = await postExample(body);
        displayData(response, 50);
      } catch (error) {
        alert(error);
      }
    });
  });

}

async function setupWrapListeners() {
  // 选取所有的 .btn 按钮和 .btn-wrap-content 内容框
  const buttons = document.querySelectorAll('.btn');
  const contentWraps = document.querySelectorAll('.btn-wrap-content');

  // 为每一个按钮添加点击事件监听
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      (contentWraps[index] as HTMLElement).style.display = 'block';
    });
  });

  // 当点击不在按钮或内容框上时，隐藏所有内容框
  document.addEventListener('click', (event: MouseEvent) => {
    let shouldHide = true;

    // 检查点击事件是否发生在按钮上
    buttons.forEach(button => {
      if (button.contains(event.target as Node)) {
        shouldHide = false;
      }
    });

    // 检查点击事件是否发生在内容框上
    contentWraps.forEach(contentWrap => {
      if (contentWrap.contains(event.target as Node)) {
        shouldHide = false;
      }
    });

    // 如果点击不在按钮或内容框上，隐藏所有内容框
    if (shouldHide) {
      contentWraps.forEach(contentWrap => {
        (contentWrap as HTMLElement).style.display = 'none';
      });
    }
  });

  // 当点击题单和难度时，获取并显示标签内的文字 
  contentWraps.forEach((contentWrap, index) => {
    (contentWrap as HTMLElement).addEventListener('click',  async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const textContent = target.innerText;

      if (textContent && textMapping[textContent]) {  
        if(index == 0){
          body.variables.filters.listId = textMapping[textContent];
        }else{
          body.variables.filters.difficulty = textMapping[textContent];
        } 
      }
      (contentWrap as HTMLElement).style.display = "none";

      try {
        const response = await postExample(body);
        displayData(response, 50);
      } catch (error) {
        alert(error);
      }

    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDivListeners();
  setupWrapListeners();
})
