 const headingElement = document.getElementById('heading');
 const inputElement = document.getElementById('input');
 const definitionWrapper =  document.getElementById('definition');
 const wordElement = document.getElementById('word');
 const meaningElement = document.getElementById('meaning');
 const audioElement = document.getElementById('audio');
 const infoElement = document.getElementById('info');

 const APP_NAME = 'Dictionary';

function start(){
    headingElement.innerText = APP_NAME;
    infoElement.innerText = "Press enter after you type the word :D";
}

 inputElement.addEventListener('keyup', e => {
    if(e.target.value && e.key === 'Enter')
        fetchAPI(e.target.value); 
 });

 async function fetchAPI(word){
    try {
        infoElement.style.display = 'block';
        definitionWrapper.style.display = 'none';
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        infoElement.innerText = `Searching the meaning of '${word}'`;
        const result = await fetch(url).then(res => res.json());
        if(result === undefined || result === null)
            infoElement.innerText = `Undefined.`;
        else{ if(result.hasOwnProperty('title')){
                infoElement.style.display = 'none';
                definitionWrapper.style.display = 'block';
                wordElement.innerText = word;
                meaningElement.innerText = "Not Available";
                audioElement.src = '';
                audioElement.style.display = 'none';
            }
            else{
                infoElement.style.display = 'none';
                definitionWrapper.style.display = 'block';
                wordElement.innerText = result[0].word;
                meaningElement.innerText = result[0].meanings[0].definitions[0].definition;
    
                const object = result[0].phonetics.find(el => el.audio != "");
                if(object !== undefined){
                    audioElement.src = object.audio;
                    audioElement.style.display = 'inline-flex';
                }
                else
                    audioElement.style.display = 'none';
            }
        }
    } catch (error) {
        console.log(error);
        infoElement.innerText = `An error occured. Try again later.`;
    }
 }

 start();