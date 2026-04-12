const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// The original content has both pages inside it.
// We will generate the new index.html and dashboard.html

const newIndexHtml = content.replace(/<!-- APP PAGE -->([\s\S]*?)<script>/g, '<script>')
.replace(/<script>([\s\S]*?)<\/script>/, `<script>
let currentUser = null;

function switchAuthTab(tab){
  document.querySelectorAll('.auth-tab').forEach((t,i)=>{
    t.classList.toggle('active', (tab==='login'&&i===0)||(tab==='signup'&&i===1));
  });
  document.getElementById('login-panel').classList.toggle('active',tab==='login');
  document.getElementById('signup-panel').classList.toggle('active',tab==='signup');
}

function getUsers(){return JSON.parse(localStorage.getItem('pp_users')||'[]')}
function saveUsers(u){localStorage.setItem('pp_users',JSON.stringify(u))}

function doLogin(){
  const email=document.getElementById('login-email').value.trim();
  const pwd=document.getElementById('login-pwd').value;
  const users=getUsers();
  const user=users.find(u=>u.email===email&&u.password===pwd);
  if(!user){toast('Invalid credentials. Try demo account.');return;}
  loginUser(user);
}
function doSignup(){
  const name=document.getElementById('signup-name').value.trim();
  const email=document.getElementById('signup-email').value.trim();
  const pwd=document.getElementById('signup-pwd').value;
  if(!name||!email||!pwd){toast('Please fill all fields.');return;}
  const users=getUsers();
  if(users.find(u=>u.email===email)){toast('Email already registered.');return;}
  const user={name,email,password:pwd};
  users.push(user);saveUsers(users);
  loginUser(user);
}
function demoLogin(){
  const demo={name:'Demo User',email:'demo@placeprep.in',password:'demo'};
  const users=getUsers();
  if(!users.find(u=>u.email===demo.email)){users.push(demo);saveUsers(users);}
  loginUser(demo);
}
function loginUser(user){
  currentUser=user;
  localStorage.setItem('pp_session',JSON.stringify(user));
  window.location.href = 'dashboard.html';
}

let toastTimeout;
function toast(msg){
  const old=document.querySelector('.toast');if(old)old.remove();
  const el=document.createElement('div');
  el.className='toast';el.textContent=msg;
  document.body.appendChild(el);
  clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>el.remove(),2500);
}

window.addEventListener('load',()=>{
  const session=localStorage.getItem('pp_session');
  if(session){
    try{
      JSON.parse(session);
      window.location.href = 'dashboard.html';
    }catch(e){localStorage.removeItem('pp_session');}
  }
});
</script>`);

fs.writeFileSync('index.html', newIndexHtml, 'utf8');

const dashboardHtml = content.replace(/<!-- AUTH PAGE -->([\s\S]*?)<!-- APP PAGE -->/g, '<!-- APP PAGE -->\n')
// modify doLogout
.replace(/function doLogout\(\)\{[\s\S]*?\}/g, `function doLogout() {
  currentUser=null;
  localStorage.removeItem('pp_session');
  window.location.href='index.html';
}`)
// change loginUser
.replace(/function loginUser\(user\)\{[\s\S]*?\}/g, `function loginUser(user){
  currentUser=user;
  localStorage.setItem('pp_session',JSON.stringify(user));
  window.location.href='dashboard.html';
}`)
// change onload logic
.replace(/window\.addEventListener\('load',\(\)=>\{[\s\S]*?\}\);/g, `window.addEventListener('load',()=>{
  const session=localStorage.getItem('pp_session');
  if(session){
    try{
      currentUser=JSON.parse(session);
      document.getElementById('app-page').classList.add('active');
      initApp();
    }catch(e){
      localStorage.removeItem('pp_session');
      window.location.href='index.html';
    }
  } else {
    window.location.href='index.html';
  }
});`);

fs.writeFileSync('dashboard.html', dashboardHtml, 'utf8');
console.log('done!');
