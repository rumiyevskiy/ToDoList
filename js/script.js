
class View {
   constructor() {
      this.input = document.createElement("input");
      this.addButton = document.createElement("button");
      this.showButton = document.createElement("button");
      this.mainBlock = document.querySelector("#app");
   }

   initRender() {
      this.mainBlock.innerHTML = " ";
      this.mainBlock.append(this.input, this.addButton, this.showButton);
      this.addButton.innerHTML = "ADD";
      this.showButton.innerHTML = "SHOW";
   }

}

class View2 {
   constructor() {
      this.taskList2 = document.createElement("ul");
      this.addButton2 = document.createElement("button");

      this.editButton2 = document.createElement("button");
      this.editInput = document.createElement("input");
      this.indexArr = 0;
      this.oldValue = 0;

      this.mainBlock = document.querySelector("#app");
   }

   renderTask2() {
      this.mainBlock.innerHTML = " ";
      this.taskList2.innerHTML = " ";
      this.mainBlock.append(this.taskList2, this.addButton2);
      this.addButton2.innerHTML = "GO TO ADD";

      

      this.taskArr = JSON.parse(localStorage.getItem("tasksKey"));

      this.taskArr.forEach(element => {
         const item2 = document.createElement("li");
         item2.innerHTML = element;
         this.taskList2.appendChild(item2);
      });

      let mylist = document.querySelectorAll("LI");
      for (let i = 0; i < mylist.length; i++) {
         let span = document.createElement("span");
         let txt = document.createTextNode("\u00D7");
         span.className = "close";
         span.appendChild(txt);
         mylist[i].appendChild(span);
         let span2 = document.createElement("span");
         let txt2 = document.createTextNode("\u270E");
         span2.className = "edit";
         span2.appendChild(txt2);
         mylist[i].appendChild(span2);
      }

   } 
   
   deleteTask() {
      let close = document.querySelectorAll(".close");
      for (let i = 0; i < close.length; i++) {
      close[i].onclick = () => {
         this.arr2 = JSON.parse(localStorage.getItem("tasksKey"));
         this.arr2.splice(i, 1);
         localStorage.setItem("tasksKey", JSON.stringify(this.arr2));
         this.renderTask2();
         this.deleteTask();
         this.editTask();

         }
      }
   }

   editTask() {
      let edit = document.querySelectorAll(".edit");
      edit.forEach((j, k) =>  {
         edit[k].onclick = () => {
            this.arr3 = JSON.parse(localStorage.getItem("tasksKey"));
            const x = this.arr3[k];
            this.indexArr = k; 
            this.mainBlock.appendChild(this.editInput);
            this.editInput.value = "";
            this.mainBlock.appendChild(this.editButton2);
            this.editButton2.innerHTML = "EDIT";
            this.editInput.setAttribute("placeholder", x);
            this.oldValue = x;
         }
      });

   }

   changArr() {
      let newValue = this.view2.editInput.value;
      console.log("indexArr", this.view2.indexArr);
      this.arr3 = JSON.parse(localStorage.getItem("tasksKey"));
      const y = this.view2.indexArr;
      this.arr3.splice(y, 1, newValue);
      localStorage.setItem("tasksKey", JSON.stringify(this.arr3));
      this.oldValue = "";
      this.view2.renderTask2();
      this.view2.deleteTask();
      this.view2.editTask();
   }


}

class Model {
   constructor() {
      this.tasks = [];
      this.arr = [];
      localStorage.setItem("tasksKey", JSON.stringify(this.tasks));
   }

   addTask(value) {
      this.arr = JSON.parse(localStorage.getItem("tasksKey"));
      this.arr.push(value);
      localStorage.setItem("tasksKey", JSON.stringify(this.arr));
      
   }
}

class Controller {
   constructor(model, view, view2) {
      this.model = model;
      this.view = view;
      this.view2 = view2;
   }

   addData() {
      let value = this.view.input.value;
      if (value === '' || value === ' ') {
         alert("You must write something!");
       } else {
      this.model.addTask(value);
      this.view.input.value = "";}
   }

   addData2() {
      this.view2.renderTask2();
      this.view2.deleteTask();
      this.view2.editTask();
   }

   returnToAdd() {
      this.view.initRender();
   }

   addHandle() {
      this.view.addButton.addEventListener("click", this.addData.bind(this));
   }

   showTaskList() {
      this.view.showButton.addEventListener("click", this.addData2.bind(this));
   }

   backToaddHandle() {
      this.view2.addButton2.addEventListener("click", this.returnToAdd.bind(this));
   }

   editTaskList() {
      this.view2.editButton2.addEventListener("click", this.view2.changArr.bind(this));
   }
}

(function init() {
   const view = new View();
   const model = new Model();
   const view2 = new View2();
   
   const controller = new Controller(model, view, view2);
   view.initRender();
   controller.addHandle();
   controller.showTaskList();
   controller.backToaddHandle();
   controller.editTaskList();
})();

