import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('_site');
const server=createServer(async(req,res)=>{try{const file=resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+sep))throw Error('path');const body=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg'})[extname(file)]||'application/octet-stream');res.end(body);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(4173,'127.0.0.1',r));
const browser=await chromium.launch();
try{
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('button.project-row').count(),5,'Projects must open an overlay, not inline expansion');
 assert(await page.locator('svg.icon').count()>=8,'Use dependable inline SVG icons');
 assert(!(await page.locator('body').textContent()).includes('\uFFFD'),'No corrupted text');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'No horizontal overflow');
 const row=page.locator('.project-row').first();await row.scrollIntoViewIfNeeded();await page.waitForTimeout(750);
 const before=await page.evaluate(()=>({y:scrollY,height:document.documentElement.scrollHeight}));
 await row.click();await page.waitForTimeout(300);
 const modal=page.locator('#project-dialog');await modal.waitFor({state:'visible'});
 assert((await modal.locator('h3').textContent()).includes('Health'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight),before.height,'Modal must not lengthen page');
 const box=await modal.boundingBox();assert(box.height<=900&&box.width<=width,'Modal fits viewport');
 await modal.locator('[data-image]').click();await page.locator('#image-dialog').waitFor({state:'visible'});
 await page.keyboard.press('Escape');await page.waitForTimeout(250);
 assert.equal(await modal.isVisible(),true,'Image closes back to case study');
 await page.keyboard.press('Escape');await page.waitForTimeout(250);
 assert.equal(await modal.isVisible(),false);
 const afterY=await page.evaluate(()=>scrollY);assert(Math.abs(afterY-before.y)<=1,`Scroll restored: before=${before.y} after=${afterY}`);
 assert.equal(await row.evaluate(el=>el===document.activeElement),true,'Focus restored');
 await page.locator('#motor-trigger').click();await modal.waitFor({state:'visible'});
 assert((await modal.locator('h3').textContent()).includes('Motor'));
 await modal.locator('.close-dialog').click();await page.waitForTimeout(250);
 assert.equal(await modal.isVisible(),false);
 await page.locator('.project-row').nth(3).click();await modal.waitFor({state:'visible'});
 await modal.locator('img').evaluate(img=>img.decode());
 assert.equal(await modal.locator('img').evaluate(img=>img.naturalWidth>0),true,'Real project image loads');
 await page.keyboard.press('Escape');await page.waitForTimeout(250);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.project-row').first().click();await modal.waitFor({state:'visible'});
 assert.equal(await modal.evaluate(el=>getComputedStyle(el).animationName),'none','Reduced motion honored');
 assert.deepEqual(errors,[],'No browser errors');
 console.log('PASS browser '+width+'px: project overlays, nested image, scroll/focus, SVG, assets, reduced motion, no JS errors');
 await page.close();
}
}finally{await browser.close();server.close();}
