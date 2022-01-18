console.log('we are in reviews section');
document.querySelector('.contact-form').addEventListener("submit",submitForm);
function submitForm(e){
    e.preventDefault();

    let name = document.querySelector('.name').value;
    let email = document.querySelector('.email').value;
    let mobile = document.querySelector('.phone').value;
    let message = document.querySelector(".message").value;
    document.querySelector(".contact-form").reset();
    sendEmail(name,email,mobile,message);
}




showReviews();
let addBtn  = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addTxt = document.getElementById('addTxt');
    let notes= localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(1,0,addTxt.value);
    localStorage.setItem('notes',JSON.stringify(notesObj))
    addTxt.value = '';
    console.log(notesObj);
    showReviews();
})

// function to show reviews
function showReviews(){
    let notes= localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html+=` <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        
        <div class="card-body">
          <h5 class="card-title">Review ${index+1}</h5>
          
          <p class="card-text">${element}</p>
          <button id="${index}"onclick="deleteReview(this.id)" class="btna btn-primary">Delete Review</button>
        </div>
      </div>`
    })
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;

    }
    else{
        notesElm.innerHTML = `Nothing to show!, use "Write your review here" section above to add reviews.`
    }

}

// function to delete a node 
function deleteReview(index){
    console.log('I am deleting',index);
    let notes= localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showReviews();
}



function sendEmail(name,email,mobile,message){
    Email.send({
        Host: "smtp.gmail.com",
        Username:"manishrana3343667@gmail.com",
        Password:"zzepfnzafotztfdx",
        To:`${email}`,
        From:"manishrana3343667@gmail.com",
        Subject:`${name} sent you a message`,
        Body:`Name:${name} <br/> Email:${email} <br/> Mobile:${mobile} <br/> Message:${message}`,

    }).then((message) => alert("mail sent successfully"))
}