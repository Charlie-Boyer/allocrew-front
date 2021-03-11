export function imageUpload(inputEl, setImgUrl, canva) {

  
  if(!inputEl.current.files[0]){return}// quitte la fonction en cas de blob vide

  const img = new Image();// crée un objet image vide
  const reader = new FileReader(); //crée un filereader pour lire le blob de l'image reçu
  let ctx = canva.current.getContext('2d'); //crée un context de canva 

  reader.readAsDataURL(inputEl.current.files[0])// attache le blob au filereader

  reader.onload = function(){
    img.src = reader.result;//crée la source de l'image 

    img.onload = function () {

      // creation du canva et de l'url en base64 pr stockage en bdd
      canva.current.width = img.width;
      canva.current.height = img.height;
      ctx.drawImage(img, 0, 0);
      const base64 = canva.current.toDataURL('image/png')
      setImgUrl(base64)
    }
  };
}