const assetRoot = './assets/';
const projects = [
 {title:'Health Insurance Quotation Portal',type:'Insurance',image:'HealthInsurance.png',description:'Health plan selection, eligibility validation and premium calculations based on demographics and medical data.',detail:'Developed PL/SQL underwriting rules, age-based pricing and interactive APEX forms for the quotation workflow.'},
 {title:'Life Insurance Quotation Portal',type:'Insurance',image:'Life.png',description:'Life insurance quotations based on age, coverage amount and policy terms.',detail:'Implemented pricing logic for age bands, sum assured and policy duration, with eligibility validation aligned to underwriting guidelines.'},
 {title:'Salvage Vehicle Auction Platform',type:'Auctions',image:'Salvage.png',description:'Vehicle listings, online auctions and bid tracking in one Oracle APEX platform.',detail:'Built auction browsing and bidding workflows, registration, OTP verification, account management and bidding history.'},
 {title:'Workshop Management Platform',type:'Operations',image:'Workshop.png',description:'A repair workflow connecting insurance operations and vehicle workshops.',detail:'Repair orders bring together claim and policy information, documents, parts, labor, costs and repair status tracking.'},
 {title:'Leave Management Workflow',type:'Internal tools',image:'HR.png',description:'Employee leave requests and manager approval workflows built with Oracle APEX.',detail:'Automated the leave-request process to reduce manual approval work, using backend PL/SQL and APEX workflows.'}
];
const list = document.querySelector('#project-list');
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function icon(name='arrow'){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.classList.add('icon');
 const path=document.createElementNS(svg.namespaceURI,'path');
 path.setAttribute('d',name==='close'?'M6 6l12 12M6 18L18 6':'M5 19L19 5M5 5h14v14');svg.append(path);return svg;
}
function textElement(tag,text,className){const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;}
const projectDialog=document.querySelector('#project-dialog');
const imageDialog=document.querySelector('#image-dialog');
function openProject(project){
 projectDialog.querySelector('#project-title').textContent=project.title;
 projectDialog.querySelector('.project-category').textContent=project.type+' / Oracle APEX';
 projectDialog.querySelector('.project-description').textContent=project.description;
 projectDialog.querySelector('.project-contribution').textContent=project.detail;
 const image=projectDialog.querySelector('img');image.src=assetRoot+project.image;image.alt=project.title+' screenshot';
 const button=projectDialog.querySelector('[data-image]');button.dataset.image=project.image;button.setAttribute('aria-label','Enlarge '+project.title+' screenshot');
 projectDialog.showModal();projectDialog.scrollTop=0;
}
projects.forEach((project,index)=>{
 const row=document.createElement('button');row.type='button';row.className='project-row';row.setAttribute('aria-haspopup','dialog');row.setAttribute('aria-controls','project-dialog');
 row.append(textElement('span',String(index+2).padStart(2,'0')+' / '+project.type,'eyebrow accent'),textElement('span',project.title,'project-name'),textElement('span',project.description,'project-summary'),icon());
 row.addEventListener('click',()=>openProject(project));list.append(row);
});
const motor={title:'Motor & Travel Quotation Portal',type:'Insurance',image:'MotorTravel.png',description:'A unified quotation platform for vehicle details, trip information and dynamic premium calculations, with real-time validation.',detail:'Implemented quotation workflows and PL/SQL business rules for vehicle risk classification, driver profiling and travel pricing, with interactive forms and underwriting validation.'};
document.querySelector('#motor-trigger').addEventListener('click',event=>{event.preventDefault();openProject(motor);});
const closing=new WeakSet();
function closeDialog(dialog){
 if(!dialog.open||closing.has(dialog))return;
 if(reducedMotion()){dialog.close();return;}
 closing.add(dialog);
 dialog.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(12px)'}],{duration:150,easing:'ease-in',fill:'forwards'}).finished.finally(()=>{
  dialog.close();dialog.getAnimations().forEach(animation=>animation.cancel());closing.delete(dialog);
 });
}
for(const dialog of [projectDialog,imageDialog]){
 dialog.querySelector('.close-dialog').addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});
 let backdropDown=false;
 dialog.addEventListener('pointerdown',event=>{backdropDown=event.target===dialog;});
 dialog.addEventListener('click',event=>{if(backdropDown&&event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeDialog(dialog);}backdropDown=false;});
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-image]');if(!button)return;
 imageDialog.querySelector('img').src=assetRoot+button.dataset.image;imageDialog.querySelector('img').alt=button.querySelector('img').alt;imageDialog.showModal();
});
// Progressive enhancement: content remains visible without IntersectionObserver.
if('IntersectionObserver' in window&&!reducedMotion()){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');observer.unobserve(entry.target);}}),{threshold:0.08});
 document.querySelectorAll('main>section,.project-row').forEach(el=>{el.classList.add('reveal-target','reveal-pending');observer.observe(el);});
}
document.querySelector('#year').textContent=new Date().getFullYear();
