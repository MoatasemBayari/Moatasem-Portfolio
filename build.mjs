import { mkdir, copyFile, rm, writeFile } from 'node:fs/promises';
const root = 'https://raw.githubusercontent.com/MoatasemBayari/MoatasemPortfolio/main/src/assets/';
const assets = ['profile.jpg','MotorTravel.png','HealthInsurance.png','Life.png','Salvage.png','Workshop.png','HR.png'];
await rm('_site', {recursive:true,force:true});
await mkdir('_site/assets',{recursive:true});
for (const file of ['index.html','styles.css','app.js','contact.js','resume.html']) await copyFile(file, '_site/'+file);
for (const asset of assets) {
 const response = await fetch(root+asset);
 if (!response.ok) throw new Error(`Asset ${asset}: HTTP ${response.status}`);
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(bytes.length<100) throw new Error(`Empty asset: ${asset}`);
 await writeFile('_site/assets/'+asset,bytes);
 console.log(`Copied ${asset}: ${bytes.length} bytes`);
}
