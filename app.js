const assetRoot = './assets/';
const projects = [
 {title:'Health Insurance Quotation Portal',type:'Insurance',image:'HealthInsurance.png',description:'Health plan selection, eligibility validation and premium calculations based on demographics and medical data.',detail:'Developed PL/SQL underwriting rules, age-based pricing and interactive APEX forms for the quotation workflow.'},
 {title:'Life Insurance Quotation Portal',type:'Insurance',image:'Life.png',description:'Life insurance quotations based on age, coverage amount and policy terms.',detail:'Implemented pricing logic for age bands, sum assured and policy duration, with eligibility validation aligned to underwriting guidelines.'},
 {title:'Salvage Vehicle Auction Platform',type:'Auctions',image:'Salvage.png',description:'Vehicle listings, online auctions and bid tracking in one Oracle APEX platform.',detail:'Built auction browsing and bidding workflows, registration, OTP verification, account management and bidding history.'},
 {title:'Workshop Management Platform',type:'Operations',image:'Workshop.png',description:'A repair workflow connecting insurance operations and vehicle workshops.',detail:'Repair orders bring together claim and policy information, documents, parts, labor, costs and repair status tracking.'},
 {title:'Leave Management Workflow',type:'Internal tools',image:'HR.png',description:'Employee leave requests and manager approval workflows built with Oracle APEX.',detail:'Automated the leave-request process to reduce manual approval work, using backend PL/SQL and APEX workflows.'}
];
const list = document.querySelector('#project-list');
projects.forEach((project,index) => {
 const row=document.createElement('details'); row.className='project-row';
 const summary=document.createElement('summary');
 const number=document.createElement('span');number.className='eyebrow accent';number.textContent=String(index+2).padStart(2,'0')+' / '+project.type;
 const title=document.createElement('h3');title.textContent=project.title;
 const description=document.createElement('p');description.textContent=project.description;
 const arrow=document.createElement('span');arrow.className='expand';arrow.textContent='+';arrow.setAttribute('aria-hidden','true');
 summary.append(number,title,description,arrow);
 const content=document.createElement('div');content.className='project-expanded';
 const copy=document.createElement('div');const heading=document.createElement('h4');heading.textContent='Behind the project';const detail=document.createElement('p');detail.textContent=project.detail;const tech=document.createElement('p');tech.className='small';tech.textContent='Oracle APEX � PL/SQL � Oracle Database � JavaScript';copy.append(heading,detail,tech);
 const button=document.createElement('button');button.className='image-button';button.dataset.image=project.image;button.setAttribute('aria-label','Enlarge '+project.title+' screenshot');
 const image=document.createElement('img');image.src=assetRoot+project.image;image.alt=project.title+' screenshot from my original portfolio';image.loading='lazy';image.width=1200;image.height=720;button.append(image);content.append(copy,button);row.append(summary,content);list.append(row);
});
const dialog=document.querySelector('#image-dialog');
document.addEventListener('click',event=>{const button=event.target.closest('[data-image]');if(button){dialog.querySelector('img').src=assetRoot+button.dataset.image;dialog.querySelector('img').alt=button.querySelector('img').alt;dialog.showModal();}});
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
document.querySelector('#motor-trigger').addEventListener('click',()=>{document.querySelector('#motor-details').open=true;});
document.querySelector('#year').textContent=new Date().getFullYear();
