const contactForm=document.querySelector('#contact-form');
const formStatus=document.querySelector('#form-status');
let sending=false;
contactForm.addEventListener('submit',async event=>{
 event.preventDefault();
 if(sending||!contactForm.reportValidity())return;
 const values=new FormData(contactForm);
 const templateParams={from_name:values.get('name').trim(),from_email:values.get('email').trim(),message:values.get('message').trim()};
 if(!templateParams.from_name||!templateParams.message){formStatus.textContent='Please enter your name and message.';return;}
 const button=contactForm.querySelector('button[type=submit]');
 sending=true;button.disabled=true;button.querySelector('span').textContent='Sending...';contactForm.setAttribute('aria-busy','true');
 formStatus.textContent='Sending your message...';formStatus.className='';
 try{
  // Public client configuration reused from the original portfolio.
  const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
   method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),
   body:JSON.stringify({service_id:'service_4m2l5jd',template_id:'template_zzezcy8',user_id:'E4cExxnzw10BvfJV1',template_params:templateParams})
  });
  if(!response.ok)throw Error('Delivery unavailable');
  contactForm.reset();formStatus.textContent="Message sent! I'll get back to you soon.";formStatus.className='success';
 }catch{
  formStatus.textContent='Your message could not be sent. Please try again or use the email link. Your message is still here.';formStatus.className='error';
 }finally{
  sending=false;button.disabled=false;button.querySelector('span').textContent='Send message';contactForm.removeAttribute('aria-busy');
 }
});
