//Appel du JSON selon les catégories
let uri = "categorie1.json"
categoryTitle.innerText = "Nourriture"
foodBtn.addEventListener("click", function() {
    uri = "categorie1.json"
    searchCategory()
    onLoad()
    categoryTitle.innerText = "Nourriture"
})
hygienBtn.addEventListener("click", function() {
    uri = "categorie2.json"
    searchCategory()
    onLoad()
    categoryTitle.innerText = "Produits d'hygiéne"
})
catgameBtn.addEventListener("click", function() {
    uri = "categorie3.json"
    searchCategory()
    onLoad()
    categoryTitle.innerText = "Jouets"
})
MaterielCat.addEventListener("click", function() {
    uri = "categorie4.json"
    searchCategory()
    onLoad()
    categoryTitle.innerText = "Matériel"
})
let priceList = []
    //Création du localStorage
const getPriceList = () => {
        //On récupère la liste des prézis dans le localStorage. Si il n'y a pas de prézis, on en crée un tableau vide
        localStorage.getItem("priceList") ? priceList = JSON.parse(localStorage.getItem("priceList")) : priceList = []
        return priceList;
    }
    //Récupération des données du localStorage
const onLoad = () => {
        priceList = getPriceList()
        localStorage.getItem("priceList") ? priceList = JSON.parse(localStorage.getItem("priceList")) : priceList = []
        return priceList;
    }
    //Fonction Json
const searchCategory = () => {
        fetch("https://mathiascabrol.github.io/CatShop/assets/json/" + uri)
            .then(fetchResponse => fetchResponse.json())
            .then(jsonContent => {
                clearCategory()
                jsonContent.results.map((article, index) => {
                    //Création de la div principale
                    let coldiv = document.createElement("div")
                    coldiv.className = "col-12 col-sm-6 col-lg-3 p-2 d-flex"
                        //Création de la div card + ombres
                    let classdiv = document.createElement("div")
                    classdiv.className = "card shadow"
                        //Création de la div contenant les images des cards
                    let imgdiv = document.createElement("img")
                    imgdiv.className = " img-flex imageSize "
                    imgdiv.src = article.image
                        //Création de la div conteant le body des cards
                    let carddiv = document.createElement("div")
                    carddiv.className = "card-body"
                        //Création de la div conteant le titre des cards
                    let cardtitle = document.createElement("h3")
                    cardtitle.className = "card-title"
                    cardtitle.innerText = article.product_name
                        //Div texte principae des cards
                    let cardptitle = document.createElement("p")
                    cardptitle.className = "card-text"
                    cardptitle.innerText = (article.description != "") ? article.description.substring(0, 200) + " ..." : null
                        //Overlay masque au-dessus de la card
                    let pricepdiv = document.createElement("p")
                    pricepdiv.innerText = article.price.toFixed(2) + " €"
                    pricepdiv.className = "badge bg-warning text-dark fs-5 m-5 text-center"
                        //Div row des boutons
                    let innerCardRow = document.createElement("div")
                    innerCardRow.className = "row mt-3 justify-content-center pb-3"
                        //Création du bouton moins
                        //Div row des boutons
                    const minusButton = document.createElement("a")
                    minusButton.className = "col-2 btn btn-danger"
                    minusButton.innerText = "-"
                    minusButton.id = "minus" + article.id
                    innerCardRow.appendChild(minusButton)
                        //Fonction diminution quantité au clic
                    minusButton.addEventListener("click", removeProduct = () => {
                            if (productsInput.value > 0) {
                                productsInput.value--
                            } else {
                                productsInput.value == 0
                            }
                        })
                        //Création de l'input du nombre de produits
                    let productsInput = document.createElement("input")
                    productsInput.setAttribute("type", "text")
                    productsInput.className = "col-4"
                    productsInput.value = 0
                    productsInput.id = "input" + article.id
                    innerCardRow.appendChild(productsInput)
                        //Création du bouton plus
                    const plusButton = document.createElement("a")
                    plusButton.className = "col-2 btn btn-success"
                    plusButton.innerText = "+"
                    plusButton.id = "plus" + article.id
                    innerCardRow.appendChild(plusButton)
                        //Fonction ajout quantité au clic
                    plusButton.addEventListener("click", addProduct = () => {
                            productsInput.value++
                        })
                        //Création du bouton valider
                    const confirmButton = document.createElement("a")
                    confirmButton.className = "col-8 btn btn-warning mt-3 mb-3 fs-5"
                    confirmButton.innerText = "Valider"
                    confirmButton.id = "confirm" + article.id
                    innerCardRow.appendChild(confirmButton)
                    let totalPriceNumber = 0
                        /**
                         * fonction qui récupère la liste des prix depuis le localStorage
                         * @returns {Array}
                         */
                        //Création du localStorage pour les tarifs total
                    let price = []
                    confirmButton.addEventListener("click", cartProduct = () => {
                            //Calcul du listedprice
                            let listedPrice = article.price * productsInput.value
                                //On crée un nouvel objet prix
                            price = [listedPrice]
                                //On ajoute la prézis à la liste des prix
                            priceList.push(price)
                                //On met à jour la liste des prézis dans le localStorage
                            localStorage.setItem("priceList", JSON.stringify(priceList))
                                //Création du rowCart
                            let rowCart = document.createElement("div")
                            rowCart.className = "row"
                            containerModal.appendChild(rowCart)
                                //Div première col
                            let productModalDiv1 = document.createElement("div")
                            productModalDiv1.className = "col-2"
                                // accroche a row cart
                            rowCart.appendChild(productModalDiv1)
                            let sum = 0
                            for (let i = 0; i < price.length; i++) {
                                sum += Number(price[i]);
                            }
                            // creation de img 
                            let productImage = document.createElement("img")
                            productImage.src = article.image
                            productImage.className = "col-12 col-sm-12 col-lg-6 img-fluid"
                            productModalDiv1.appendChild(productImage)
                                // creation de la seconde div col 3
                            let productModalDiv2 = document.createElement("div")
                            productModalDiv2.className = "col-sm-2 "
                            rowCart.appendChild(productModalDiv2)
                                // creation du paragraphe titre
                            let pProductTitle = document.createElement("p")
                            pProductTitle.innerText = article.product_name
                            productModalDiv2.appendChild(pProductTitle)
                                //Création de la div tarif
                            let cartPriceDiv = document.createElement("div")
                            cartPriceDiv.className = "col-sm-2"
                            rowCart.appendChild(cartPriceDiv)
                                //Création de l'input du nombre de produits
                            let innerDivModal = document.createElement("div")
                            innerDivModal.className = "col-6 col-sm-6 col-lg-2"
                            let innerCardRowModal = document.createElement("div")
                            innerCardRowModal.className = "col-12 col-sm-3 col-lg-2 justify-content-center"
                                //Création du bouton moins
                            const minusButtonModal = document.createElement("a")
                            minusButtonModal.className = "col-3 col-sm-1  col-lg-2 btn btn-danger"
                            minusButtonModal.innerText = "-"
                            minusButtonModal.id = "minusModal" + article.id
                            innerDivModal.appendChild(minusButtonModal)
                                //Fonction diminution quantité au clic
                            minusButtonModal.addEventListener("click", removeProductModal = () => {
                                    if (productsInputModal.value > 0) {
                                        productsInputModal.value--
                                            rowPrice = article.price * productsInputModal.value
                                        paraPrice.innerText = rowPrice.toFixed(2)
                                        totalPriceNumber = totalPriceNumber - article.price
                                        modalTotalPrice.innerText = "Montant total : " + totalPriceNumber.toFixed(2) + " €"
                                    } else {
                                        productsInputModal.value == 0
                                    }
                                })
                                //Partie du code dans le modal
                            var productsInputModal = document.createElement("input")
                            productsInputModal.setAttribute("type", "text")
                            productsInputModal.className = "col-3 col-sm-3 col-lg-2"
                            productsInputModal.value = productsInput.value
                            productsInputModal.id = "inputModal" + article.id
                            innerDivModal.appendChild(productsInputModal)
                                //Création prix
                            var paraPrice = document.createElement("p")
                                //Calcul du prix
                            rowPrice = article.price * productsInputModal.value
                            paraPrice.innerText = rowPrice.toFixed(2)
                            cartPriceDiv.appendChild(paraPrice)
                                //Création du bouton plus
                            const plusButtonModal = document.createElement("a")
                            plusButtonModal.className = "col-3 col-sm-1 col-lg-2 btn btn-success"
                            plusButtonModal.innerText = "+"
                            plusButtonModal.id = "plusModal" + article.id
                            innerDivModal.appendChild(plusButtonModal)
                                //Fonction ajout quantité au clic
                            plusButtonModal.addEventListener("click", addProductModal = () => {
                                productsInputModal.value++
                                    rowPrice = article.price * productsInputModal.value
                                paraPrice.innerText = rowPrice.toFixed(2)
                                totalPriceNumber = totalPriceNumber + article.price
                                modalTotalPrice.innerText = "Montant total : " + totalPriceNumber.toFixed(2) + " €"
                            })
                            rowCart.appendChild(innerDivModal)
                            let valDivModal = document.createElement("div")
                            valDivModal.className = "col-12 col-sm-4 col-lg-2"
                                //Création du bouton supprimer
                            const deleteButtonModal = document.createElement("a")
                            deleteButtonModal.className = "btn btn-warning m-2"
                            deleteButtonModal.innerText = "Supprimer"
                            deleteButtonModal.id = "deleteModal" + article.id
                            deleteButtonModal.addEventListener("click", deleteRowCart = () => {
                                totalPriceNumber = totalPriceNumber - rowPrice
                                modalTotalPrice.innerText = "Montant total : " + totalPriceNumber.toFixed(2) + " €"
                                rowCart.remove()
                            })
                            valDivModal.appendChild(deleteButtonModal)
                            rowCart.append(valDivModal)
                            totalPriceNumber = totalPriceNumber + sum
                            modalTotalPrice.innerText = "Montant total : " + parseFloat(totalPriceNumber).toFixed(2) + " €"
                        })
                        //Accrochage des divs
                    carddiv.append(cardtitle, cardptitle)
                    classdiv.append(imgdiv, carddiv, pricepdiv, innerCardRow)
                    coldiv.append(classdiv)
                    articleContent.append(coldiv)
                })
            })
    }
    //Suppression du contenu précédent
const clearCategory = () => {
    articleContent.innerText = ""
}
searchCategory()
    //bonus panier jolie